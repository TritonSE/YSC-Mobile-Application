import type { Socket } from "socket.io";

import { PORT } from "./constants";
import type { RoomData, BoardState } from "./types";
import { validateToken } from "./utils/auth";

const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
  console.log("connected to server: ", socket.id);

  socket.on("validate", (data) => {
    const { token } = JSON.parse(data);
    console.log("connected in socket.on validate? ", socket.connected); // expect true
    validateToken(token, socket); // socket will disconnect in this method if invalid token
  });

  socket.on("disconnect", () => {
    console.log("connected in socket.on disconnect? ", socket.connected); // expect false
  });

  const username = socket.handshake.auth.username;
  let currRoom = "Room " + boards.size;

  // Check if user is already in a room
  const userRoomData = rooms.get(username);
  if (userRoomData) {
    // If so, place socket back into that room
    const newSocket: RoomData = { room: userRoomData.room, socket: socket.id };
    rooms.set(username, newSocket);
  } else {
    let board: BoardState = { lock: 0, board: "", players: [username] };

    // socket only has default socket ID room => assign socket to a room
    if (socket.rooms.size == 1) {
      if (io.sockets.adapter.rooms.get(currRoom)) {
        //Check if current room is full => create new room
        if (io.sockets.adapter.rooms.get(currRoom).size == 2) {
          currRoom = "Room " + (boards.size + 1);
        } else {
          const currBoard = boards.get(currRoom);
          if (currBoard) board = { ...board, players: [currBoard.players[0], username] };
        }
      }
      boards.set(currRoom, board);
      rooms.set(username, { room: currRoom, socket: socket.id });
      socket.join(currRoom);
    }
  }

  // require("./eventHandlers/moveHandler.ts")(socket, io, username, rooms, boards);
  // require("./eventHandlers/resignHandler.ts")(socket, io, username, rooms, boards);
  // require("./eventHandlers/drawHandler.ts")(socket, io, username, rooms, boards);
});

io.of("/").adapter.on("delete-room", (room: string) => {
  boards.delete(room);
});
