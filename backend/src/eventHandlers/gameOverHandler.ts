import type { GameHandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  socket.on("game over", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        io.socketsLeave(room);
        roomsMap.delete(roomBoardData.players[0]);
        roomsMap.delete(roomBoardData.players[1]);
        boards.delete(room);
      }
    }
  });
};
