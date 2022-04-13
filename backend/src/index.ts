import type { Socket } from "socket.io";

import type { RoomData, BoardState } from "./types";

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
const rooms = new Map<string, RoomData>();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// triggered whenever a new socket connects to server
// the new socket should send the username of the client through the auth object
io.on("connection", (socket: Socket) => {
  require("./eventHandlers/loginHandler.ts")(socket, io, rooms, boards);
});

io.of("/").adapter.on("delete-room", (room: string) => {
  boards.delete(room);
});
