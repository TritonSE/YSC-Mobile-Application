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

interface BaseHandlerParams {
  socket: Socket;
  io: Server;
  roomsMap: Map<string, RoomData>;
  boards: Map<string, BoardState>;
}

interface HandlerParams extends BaseHandlerParams {
  username: string;
}

export { RoomData, BoardState, HandlerParams, BaseHandlerParams };
