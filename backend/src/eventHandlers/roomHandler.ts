import type { HandlerParams, BoardState } from "../types";

exports = function ({ socket, io, username, rooms, boards }: HandlerParams) {
  socket.on("assign room", () => {
    let currRoom = "Room " + boards.size;
    let board: BoardState = { lock: 0, board: "", players: [username] };

    // socket only has default socket ID room => assign socket to a room
    if (socket.rooms.size == 1) {
      if (io.sockets.adapter.rooms.get(currRoom)) {
        //Check if current room is full => create new room
        if (io.sockets.adapter.rooms.get(currRoom).size == 2) {
          currRoom = "Room " + (boards.size + 1);
        } else {
          const currBoard = boards.get(currRoom);
          if (currBoard) board = { ...board, players: [currBoard.players[0], username] };
        }
      }
      boards.set(currRoom, board);
      rooms.set(username, { room: currRoom, socket: socket.id });
      socket.join(currRoom);
    }
  });
};
