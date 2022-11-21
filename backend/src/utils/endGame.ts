import type { Server } from "socket.io";

import type { RoomData, BoardState } from "../types";

function endGame(
  io: Server,
  room: string | undefined,
  roomsMap: Map<string, RoomData>,
  boards: Map<string, BoardState>,
  status?: string,
  arg?: string
) {
  if (!room) return;

  const board: BoardState | undefined = boards.get(room);
  if (board) {
    io.in(room).emit(status ?? "game over", arg ?? "checkmate");
    io.socketsLeave(room);
    roomsMap.delete(board.players[0]);
    roomsMap.delete(board.players[1]);
    boards.delete(room);
  }
}

export default endGame;
