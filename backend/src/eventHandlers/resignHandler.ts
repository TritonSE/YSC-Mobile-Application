import type { GameHandlerParams } from "../types";
import endGame from "../utils/endGame";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  // CLIENT WORKFLOW FOR RESIGNATION
  // client A should emit "resign" if they attempt to resign
  // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent
  // the server will handle deletion of rooms
  socket.on("resign", () => {
    endGame(io, roomsMap.get(username)?.room, roomsMap, boards, "game resigned", username);
  });
};
