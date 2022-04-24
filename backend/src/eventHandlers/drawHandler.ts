import type { HandlerParams } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: HandlerParams) {
  // CLIENT WORKFLOW FOR DRAWING
  // client A should emit "try draw" if they attempt to draw
  // client B should handle "draw request" event with the username of the client A being sent
  // if client B wants to accept the draw, client B should emit "draw accepted"
  //  in this case, both clients should handle "game drawn" event with username of client B being sent
  // if client B wants to decline the draw, client B should emit "draw rejected"
  //  in this case, client A should handle "draw request rejected" with username of client B being sent
  socket.on("try draw", () => {
    console.log("proposing draw received");
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      socket.to(room).emit("draw request", username);
    }
  });

  socket.on("draw accepted", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      io.in(room).emit("game drawn", username);
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        roomsMap.delete(roomBoardData.players[0]);
        roomsMap.delete(roomBoardData.players[1]);
        boards.delete(room);
      }
    }
  });

  socket.on("draw rejected", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      socket.to(room).emit("draw request rejected", username);
    }
  });
};
