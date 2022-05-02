import type { GameHandlerParams, BoardState } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: GameHandlerParams) {
  // CLIENT WORKFLOW FOR MOVE:
  // first socket A will emit "check turn" to see if it is their turn
  // socket A will listen to "your turn" and if true,
  //    socket A will emit "send chess move" with updated chess fenstring
  //    socket B will listen to "updated board" and load new chess object
  socket.on("check turn", () => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;

      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        const currLock = roomBoardData.lock;

        //Check if lock points to current client => it is client's turn
        if (roomBoardData.players[currLock] == username) {
          socket.emit("your turn", true);
        } else {
          socket.emit("your turn", false);
        }
      }
    }
  });
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
