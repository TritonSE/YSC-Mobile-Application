import type { RoomHandlerParams } from "../types";

module.exports = function ({ socket, io, roomsMap, clientMap }: RoomHandlerParams) {
  socket.on("request player count", () => {
    socket.emit("send player count", io.engine.clientsCount);
  });
  socket.on("request list of players", () => {
    socket.emit(
      "send list of players",
      Array.from(clientMap).map(([name]) => ({
        username: name,
        status: roomsMap.get(name) ? "ingame" : "ready",
      }))
    );
  });
};
