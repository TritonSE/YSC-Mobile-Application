import type { BaseHandlerParams } from "../types";

module.exports = function ({ socket, io }: BaseHandlerParams) {
  socket.on("request player count", () => {
    socket.emit("send player count", io.engine.clientsCount);
  });
};
