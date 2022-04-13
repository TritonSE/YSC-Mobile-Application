import type { HandlerParams, RoomData } from "../types";

exports = function ({ socket, io, rooms, boards }: HandlerParams) {
  socket.on("successful login", (username: string) => {
    // Check if user is already in a room
    const userRoomData = rooms.get(username);
    if (userRoomData) {
      // If so, place socket back into that room
      const newSocket: RoomData = { room: userRoomData.room, socket: socket.id };
      rooms.set(username, newSocket);
    }
    require("./roomHandler.ts")(socket, io, username, rooms, boards);
    require("./moveHandler.ts")(socket, io, username, rooms, boards);
    require("./resignHandler.ts")(socket, io, username, rooms, boards);
    require("./drawHandler.ts")(socket, io, username, rooms, boards);
  });
};
