import type { BaseHandlerParams } from "../types";

module.exports = function ({ socket, io }: BaseHandlerParams) {
  socket.on("request player count", () => {
    const playerCount = io.engine.clientsCount;
    socket.emit("send player count", playerCount);
  });
};
