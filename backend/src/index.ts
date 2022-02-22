import type {RoomData, BoardState} from "./types";

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
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
io.on("connection", (socket:any) => {
  let username = socket.handshake.auth.username;
  let currRoom = "Room " + boards.size;

  // Check if user is already in a room
  if (rooms.get(username) != null) {

    // If so, place socket back into that room 
    let newSocket:RoomData = {room: rooms.get(username)!.room, socket: socket.id};
    rooms.set(username, newSocket);
  } else {
    let board:BoardState = {lock: 0, board: "", players: [username]};

    // socket only has default socket ID room => assign socket to a room
    if(socket.rooms.size == 1) {
      if(io.sockets.adapter.rooms.get(currRoom) != null) {

        //Check if current room is full => create new room
        if(io.sockets.adapter.rooms.get(currRoom).size == 2) { 
          currRoom = "Room " + (boards.size + 1); 
        } else {
          board = {...board, players: [boards.get(currRoom)!.players[0], username]} 
        }
      }
      boards.set(currRoom, board);
      rooms.set(username, {room: currRoom, socket:socket.id});
      socket.join(currRoom)
    } 
  }

  require("./eventHandlers/moveHandler.ts")(socket, io, username, rooms, boards);
  require("./eventHandlers/resignHandler.ts")(socket, io, username, rooms, boards);
  require("./eventHandlers/drawHandler.ts")(socket, io, username, rooms, boards);
  
});

io.of("/").adapter.on("delete-room", (room:any) => {  
  boards.delete(room);
});