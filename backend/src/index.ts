import type { Socket } from "socket.io";

import type { RoomData, BoardState } from "./types";
import validateToken from "./utils/auth";

const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// boards maps room to BoardState (BoardState contains all data in regards to the state of the game and is declared in types.d.ts)
const boards = new Map<string, BoardState>();

// rooms maps username to RoomData (RoomData contains connection information for users and is declared in types.d.ts)
const roomsMap = new Map<string, RoomData>();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// triggered whenever a new socket connects to server
io.on("connection", (socket: Socket, token: string) => {
  console.log("connected to server: ", socket.id);
  validateToken(token, socket); // socket will disconnect in this method if invalid token

  require("./eventHandlers/loginHandler.ts")({ socket, io, roomsMap, boards });
});

io.of("/").adapter.on("delete-room", (room: string) => {
  boards.delete(room);
});
