import type { GameHandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  socket.on("no rematch", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        io.in(room).emit("game over");
        io.socketsLeave(room);
        roomsMap.delete(roomBoardData.players[0]);
        roomsMap.delete(roomBoardData.players[1]);
        boards.delete(room);
      }
    }
  });
  socket.on("rematch", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        if (!roomBoardData.rematchAccept.includes(username)) {
          roomBoardData.rematchAccept.push(username);
        }
        if (roomBoardData.players.length == roomBoardData.rematchAccept.length) {
          const startGameString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
          roomBoardData.board = startGameString;
          io.in(room).emit("updated board", startGameString);
          roomBoardData.rematchAccept = [];
          boards.set(room, roomBoardData);
        }
      }
    }
  });
};
