import type { GameHandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  // CLIENT WORKFLOW FOR DRAWING
  // client A should emit "try draw" if they attempt to draw
  // client B should handle "draw request" event with the username of the client A being sent
  // if client B wants to accept the draw, client B should emit "draw accepted"
  //  in this case, both clients should handle "game drawn" event with username of client B being sent
  // if client B wants to decline the draw, client B should emit "draw rejected"
  //  in this case, client A should handle "draw request rejected" with username of client B being sent
  socket.on("try draw", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      socket.to(room).emit("draw request", username);
    }
  });

  socket.on("draw accepted", () => {
    const roomObj = roomsMap.get(username);
    if (roomObj) {
      io.in(roomObj.room).emit("game drawn", username);
    }
  });

  socket.on("draw rejected", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      // emits "draw request rejected" to the socket that sent initial draw request
      socket.to(room).emit("draw request rejected", username);
    }
  });
};
