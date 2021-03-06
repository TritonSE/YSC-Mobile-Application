import type { GameHandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  // CLIENT WORKFLOW FOR RESIGNATION
  // client A should emit "resign" if they attempt to resign
  // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent
  // the server will handle deletion of rooms
  socket.on("resign", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      // emits "game resigned" to the other player in the room
      socket.to(room).emit("game resigned", username);
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
