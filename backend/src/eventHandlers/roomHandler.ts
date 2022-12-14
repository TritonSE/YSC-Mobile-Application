import type { Socket } from "socket.io";

import type {
  RoomData,
  GameInvite,
  GameHandlerParams,
  RoomHandlerParams,
  BoardState,
} from "../types";
import endGame from "../utils/endGame";

const assignToRoom = (
  { socket, io, username, roomsMap, boards }: GameHandlerParams,
  id?: string
) => {
  // sockets always have at least 1 room (for private messaging)
  // so if there is exactly one, then it is not in a chess game room yet
  if (socket.rooms.size !== 1) return;

  let roomID = "none";
  const board: BoardState = { lock: 0, board: "", players: [username], rematchAccept: [] };

  if (id) {
    const currBoard = boards.get(id);
    if (currBoard) {
      board.players = [currBoard.players[0], username];
    }

    roomID = id;
  } else {
    const search = Array.from(boards).find(
      ([name, tmpBoard]) => !name.includes("Private") && tmpBoard.players.length === 1
    );
    if (search) {
      roomID = search[0];
      board.players = [search[1].players[0], username];
    } else {
      roomID = boards.size == 0 ? "Room 1" : "Room " + boards.size;
    }
  }

  // sets board states, room data, and places socket in room
  boards.set(roomID, board);
  roomsMap.set(username, { room: roomID, socket: socket.id });
  socket.join(roomID);
  socket.on("disconnect", () => {
    endGame(io, roomID, roomsMap, boards, "opponent disconnect");
  });

  // emit colors and player list after both players are assigned
  if (board.players.length === 2) {
    const white_socket = roomsMap.get(board.players[0]);
    const black_socket = roomsMap.get(board.players[1]);
    if (white_socket && black_socket) {
      io.to(white_socket.socket).emit("successful assign", "w", board.players);
      io.to(black_socket.socket).emit("successful assign", "b", board.players);
    }
  }
};

module.exports = function ({
  socket,
  io,
  username,
  roomsMap,
  boards,
  clientMap,
  invites,
}: RoomHandlerParams) {
  socket.on("disconnect", () => {
    clientMap.delete(username);

    const inv: GameInvite | undefined = invites.get(username);
    if (inv) {
      invites.delete(inv.from);
      invites.delete(inv.to);
    }
  });

  // Check if user is already in a room
  const userRoomData: RoomData | undefined = roomsMap.get(username);
  if (userRoomData) {
    // If so, place socket back into that room
    const newSocket: RoomData = { room: userRoomData.room, socket: socket.id };
    roomsMap.set(username, newSocket);
  }

  socket.on("assign to room", () => {
    assignToRoom({ socket, io, username, roomsMap, boards } as GameHandlerParams);
  });
  socket.on("unassign from room", () => {
    const room: RoomData | undefined = roomsMap.get(username);
    if (room) {
      endGame(io, room.room, roomsMap, boards);
    }
  });
  socket.on("send invite", (dest) => {
    if (invites.get(username) || invites.get(dest)) {
      socket.emit("failed to send invite", "The user was invited to another game!");
      return;
    }

    if (roomsMap.get(username) || roomsMap.get(dest)) {
      socket.emit("failed to send invite", "The user is already in a game!");
      return;
    }

    const recip: Socket | undefined = clientMap.get(dest);
    if (!recip) {
      socket.emit("failed to send invite", "The user is no longer online!");
      return;
    }

    const inv: GameInvite = {
      from: username,
      to: dest,
    };
    invites.set(username, inv);
    invites.set(dest, inv);
    recip.emit("invited", username);
  });
  socket.on("cancel invite", () => {
    const inv: GameInvite | undefined = invites.get(username);
    if (!inv) return;

    const recip: Socket | undefined = clientMap.get(inv.to);
    if (recip) recip.emit("uninvited");

    invites.delete(username);
    invites.delete(inv.to);
  });
  socket.on("accept invite", () => {
    const inv: GameInvite | undefined = invites.get(username);
    if (!inv) return;

    const from: Socket | undefined = clientMap.get(inv.from);
    const to: Socket | undefined = clientMap.get(inv.to);

    invites.delete(inv.from);
    invites.delete(inv.to);

    if (!from || !to) {
      socket.emit("failed to send invite", "The user is no longer online!");
      return;
    }

    from.emit("invite accepted");
    assignToRoom(
      {
        socket: from,
        io,
        username: inv.from,
        roomsMap,
        boards,
      } as GameHandlerParams,
      `${username}'s Private Match`
    );
    assignToRoom(
      {
        socket: to,
        io,
        username: inv.to,
        roomsMap,
        boards,
      } as GameHandlerParams,
      `${username}'s Private Match`
    );
  });
  socket.on("decline invite", () => {
    const inv: GameInvite | undefined = invites.get(username);
    if (!inv) return;

    const sender: Socket | undefined = clientMap.get(inv.from);
    if (sender) sender.emit("invite declined");

    invites.delete(inv.from);
    invites.delete(inv.to);
  });
};
