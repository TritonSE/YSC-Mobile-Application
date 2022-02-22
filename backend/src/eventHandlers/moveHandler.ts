import type { RoomData, BoardState } from "../types";

exports = function (
  socket: any,
  io: any,
  username: string,
  rooms: Map<string, RoomData>,
  boards: Map<string, BoardState>
) {
  // CLIENT WORKFLOW FOR ATTEMPTED MOVE
  // client A should emit "try chess move" and send the board state after the attempted move
  // if the move is successful, both clients should handle "updated board" event with the new board being sent
  // otherwise, client A should handle "error message" event with an error message being sent
  socket.on("try chess move", (newBoard: string) => {
    const room = rooms.get(username)!.room;
    const currLock = boards.get(room)!.lock;

    //Check if lock points to current client => update board state
    if (boards.get(room)!.players[currLock] == username) {
      const nextLock = (currLock + 1) % 2;
      const newBoardState: BoardState = {
        lock: nextLock,
        board: newBoard,
        players: boards.get(room)!.players,
      };
      boards.set(room, newBoardState);
      io.in(room).emit("updated board", newBoard);
    } else {
      socket.emit("error message", "It is not your turn");
    }
  });
};
