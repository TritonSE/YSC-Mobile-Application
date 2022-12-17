import * as fs from "node:fs";

import type { RoomHandlerParams } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let progress: Array<any> = [];
try {
  const str = fs.readFileSync("progress.json").toString();
  progress = JSON.parse(str);
  // eslint-disable-next-line no-empty
} catch (e) {}

module.exports = function ({
  socket,
  io,
  roomsMap,
  username,
  clientMap,
  roleMap,
}: RoomHandlerParams) {
  socket.on("request player count", () => {
    socket.emit("send player count", io.engine.clientsCount);
  });
  socket.on("request list of players", () => {
    socket.emit(
      "send list of players",
      Array.from(clientMap).map(([name]) => {
        const inGame = roomsMap.get(name);
        let status = "ready";
        if (inGame) {
          status = inGame.isMentorSession ? "lesson" : "ingame";
        }
        return {
          username: name,
          status,
          userRole: roleMap.get(name),
        };
      })
    );
  });
  socket.on("request progress", () => {
    socket.emit("send progress", progress.find((x) => x.username === username) ?? {});
  });
  socket.on("request list of progress", () => {
    socket.emit("send list of progress", progress);
  });
  socket.on("lesson complete", (lesson) => {
    const arr = progress.find((x) => x.username === username);
    if (!arr) {
      progress.push({ username, status: { [lesson]: true } });
    } else {
      arr.status[lesson] = true;
    }

    fs.writeFileSync("progress.json", JSON.stringify(progress));
  });
};
