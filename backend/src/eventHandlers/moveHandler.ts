import type { GameHandlerParams, BoardState } from "../types";

module.exports = function ({ socket, username, roomsMap, boards }: GameHandlerParams) {
  // CLIENT WORKFLOW FOR MOVE:
  //    socket A will emit "send chess move" with updated chess fenstring
  //    socket B will listen to "updated board" and load new chess object
  socket.on("send chess move", (newBoard: string) => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;
      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        const currLock = roomBoardData.lock;
        const nextLock = (currLock + 1) % 2;
        const newBoardState: BoardState = {
          lock: nextLock,
          board: newBoard,
          players: roomBoardData.players,
        };
        boards.set(room, newBoardState);
        socket.to(room).emit("updated board", newBoard);
      }
    }
  });
};
