import type { Socket, Server } from "socket.io";

type RoomData = {
  room: string;
  socket: string;
};

type BoardState = {
  lock: number;
  board: string;
  players: string[];
};

interface HandlerParams {
  socket: Socket;
  io: Server;
  username: string;
  rooms: Map<string, RoomData>;
  boards: Map<string, BoardState>;
}

export { RoomData, BoardState, HandlerParams };
