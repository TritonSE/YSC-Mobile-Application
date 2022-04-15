import type { HandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: HandlerParams) {
  // CLIENT WORKFLOW FOR RESIGNATION
  // client A should emit "resign" if they attempt to resign
  // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent
  // the server will handle deletion of rooms
  socket.on("resign", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      io.in(room).emit("game resigned", username);
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        roomsMap.delete(roomBoardData.players[0]);
        roomsMap.delete(roomBoardData.players[1]);
        boards.delete(room);
      }
    }
  });
};
