import type { RoomHandlerParams } from "../types";

module.exports = function (base_args: RoomHandlerParams) {
  base_args.socket.on("successful login", (username: string, role: string) => {
    base_args.clientMap.set(username, base_args.socket);
    base_args.roleMap.set(username, role);

    const args = { ...base_args, username };
    require("./roomHandler.ts")(args);
    require("./moveHandler.ts")(args);
    require("./resignHandler.ts")(args);
    require("./gameOverHandler.ts")(args);
    require("./drawHandler.ts")(args);
    require("./playerCountHandler.ts")(args);
  });
};
