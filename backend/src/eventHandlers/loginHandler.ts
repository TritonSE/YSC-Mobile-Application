import type { BaseHandlerParams, RoomData } from "../types";

module.exports = function ({ socket, io, roomsMap, boards }: BaseHandlerParams) {
  socket.on("successful login", (username: string) => {
    // Check if user is already in a room
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      // If so, place socket back into that room
      const newSocket: RoomData = { room: userRoomData.room, socket: socket.id };
      roomsMap.set(username, newSocket);
    }
    require("./roomHandler.ts")({ socket, io, username, roomsMap, boards });
    require("./moveHandler.ts")({ socket, io, username, roomsMap, boards });
    require("./resignHandler.ts")({ socket, io, username, roomsMap, boards });
    require("./drawHandler.ts")({ socket, io, username, roomsMap, boards });
  });
};
