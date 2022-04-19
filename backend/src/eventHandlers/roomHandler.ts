import type { HandlerParams, BoardState } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: HandlerParams) {
  socket.on("assign to room", () => {
    let currRoom = boards.size == 0 ? "Room 1" : "Room " + boards.size;
    let board: BoardState = { lock: 0, board: "", players: [username] };

    // socket only has default socket ID room => assign socket to a room
    if (socket.rooms.size == 1) {
      const socketsRoom = io.sockets.adapter.rooms.get(currRoom);
      if (socketsRoom) {
        //Check if current room is full => create new room
        if (socketsRoom.size == 2) {
          currRoom = "Room " + (boards.size + 1);
        } else {
          const currBoard = boards.get(currRoom);
          if (currBoard) board = { ...board, players: [currBoard.players[0], username] };
        }
      }
      boards.set(currRoom, board);
      roomsMap.set(username, { room: currRoom, socket: socket.id });
      socket.join(currRoom);
    }
  });
};
