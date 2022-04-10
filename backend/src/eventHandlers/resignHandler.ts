import type { HandlerParams } from "../types";

exports = function ({ socket, io, username, rooms, boards }: HandlerParams) {
  // CLIENT WORKFLOW FOR RESIGNATION
  // client A should emit "resign" if they attempt to resign
  // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent
  // the server will handle deletion of rooms
  socket.on("resign", () => {
    const userRoomData = rooms.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      io.in(room).emit("game resigned", username);
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        rooms.delete(roomBoardData.players[0]);
        rooms.delete(roomBoardData.players[1]);
        boards.delete(room);
      }
    }
  });
};
