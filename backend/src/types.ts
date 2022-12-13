import type { Socket, Server } from "socket.io";

type RoomData = {
  room: string;
  socket: string;
};

type BoardState = {
  lock: number;
  board: string;
  players: string[];
  rematchAccept: string[];
};

type GameInvite = {
  from: string;
  to: string;
};

interface BaseHandlerParams {
  socket: Socket;
  io: Server;
  roomsMap: Map<string, RoomData>;
  boards: Map<string, BoardState>;
}

interface GameHandlerParams extends BaseHandlerParams {
  username: string;
}

interface RoomHandlerParams extends GameHandlerParams {
  clientMap: Map<string, Socket>;
  invites: Map<string, GameInvite>;
}

export {
  RoomData,
  BoardState,
  GameInvite,
  GameHandlerParams,
  RoomHandlerParams,
  BaseHandlerParams,
};
