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

interface LoginHandlerParams {
  socket: Socket;
  io: Server;
  roomsMap: Map<string, RoomData>;
  boards: Map<string, BoardState>;
}

interface HandlerParams {
  socket: Socket;
  io: Server;
  username: string;
  roomsMap: Map<string, RoomData>;
  boards: Map<string, BoardState>;
}

export { RoomData, BoardState, HandlerParams, LoginHandlerParams };
