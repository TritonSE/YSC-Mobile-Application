import type { GameHandlerParams, BoardState } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  socket.on("assign to room", () => {
    let roomID = boards.size == 0 ? "Room 1" : "Room " + boards.size;
    let board: BoardState = { lock: 0, board: "", players: [username], rematchAccept: [] };

    // sockets always have at least 1 room (for private messaging)
    // so if there is exactly one, then it is not in a chess game room yet
    if (socket.rooms.size == 1) {
      const socketsRoom = io.sockets.adapter.rooms.get(roomID);
      if (socketsRoom) {
        // check if current room is full => create new room
        if (socketsRoom.size == 2) {
          roomID = "Room " + (boards.size + 1);
        } else {
          // otherwise we check if the room already has a board
          const currBoard = boards.get(roomID);
          if (currBoard) {
            // adds second player to board state
            board = { ...board, players: [currBoard.players[0], username] };
          }
        }
      }
      // sets board states, room data, and places socket in room
      boards.set(roomID, board);
      roomsMap.set(username, { room: roomID, socket: socket.id });
      socket.join(roomID);

      // emit colors and player list after both players are assigned
      if (board.players.length == 2) {
        const white_socket = roomsMap.get(board.players[0]);
        const black_socket = roomsMap.get(board.players[1]);
        if (white_socket && black_socket) {
          io.to(white_socket.socket).emit("successful assign", "w", board.players);
          io.to(black_socket.socket).emit("successful assign", "b", board.players);
        }
      }
    }
  });
};
