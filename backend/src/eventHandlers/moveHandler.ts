import type { HandlerParams, BoardState } from "../types";

module.exports = function ({ socket, io, username, roomsMap, boards }: HandlerParams) {
  // CLIENT WORKFLOW FOR ATTEMPTED MOVE
  // client A should emit "try chess move" and send the board state after the attempted move
  // if the move is successful, both clients should handle "updated board" event with the new board being sent
  // otherwise, client A should handle "error message" event with an error message being sent
  socket.on("try chess move", (newBoard: string) => {
    const userRoomData = roomsMap.get(username);
    if (userRoomData) {
      const room = userRoomData.room;

      const roomBoardData = boards.get(room);
      if (roomBoardData) {
        const currLock = roomBoardData.lock;

        //Check if lock points to current client => update board state
        if (roomBoardData.players[currLock] == username) {
          const nextLock = (currLock + 1) % 2;
          const newBoardState: BoardState = {
            lock: nextLock,
            board: newBoard,
            players: roomBoardData.players,
          };
          boards.set(room, newBoardState);
          io.in(room).emit("updated board", newBoard);
        } else {
          socket.emit("error message", "It is not your turn");
        }
      }
    }
  });
};
