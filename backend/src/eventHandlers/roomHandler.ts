import type { GameHandlerParams, BoardState } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  socket.on("assign to room", () => {
    let currRoom = boards.size == 0 ? "Room 1" : "Room " + boards.size;
    let board: BoardState = { lock: 0, board: "", players: [username] };
    let color = "w";

    // socket only has default socket ID room => assign socket to a room
    if (socket.rooms.size == 1) {
      const socketsRoom = io.sockets.adapter.rooms.get(currRoom);
      if (socketsRoom) {
        //Check if current room is full => create new room
        if (socketsRoom.size == 2) {
          currRoom = "Room " + (boards.size + 1);
        } else {
          const currBoard = boards.get(currRoom);
          if (currBoard) {
            board = { ...board, players: [currBoard.players[0], username] };
            color = "b";
          }
        }
      }
      boards.set(currRoom, board);
      roomsMap.set(username, { room: currRoom, socket: socket.id });
      socket.join(currRoom);
      socket.emit("successful assign", color);

      if (board.players.length == 2) {
        io.to(currRoom).emit("game ready");
      }
    }
  });
};
