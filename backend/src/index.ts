const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Currently locks are socket.id's. Will change to base them off of usernames
type BoardState = {
  lock: number;
  board: string;
  players: string[];
};
const boards = new Map();
const rooms = new Map();
let numRooms = 0;


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


io.on("connection", (socket:any) => {
  let username = socket.handshake.auth.username;
  let currRoom = "Room " + numRooms;

  if (rooms.get(username) != null) {
    let newSocket = {...rooms.get(username), socket: socket.id};
    rooms.set(username, newSocket);
  } else {
    let board:BoardState = {lock: 0, board: "", players: [username]};
    // socket only has socket ID room => create new room
    if(socket.rooms.size == 1) {
      if(io.sockets.adapter.rooms.get(currRoom) != null) {
        if(io.sockets.adapter.rooms.get(currRoom).size == 2) {
          numRooms++;
          currRoom = "Room " + numRooms;
        } else {
          board = {...board, players: [boards.get(currRoom).players[0], username]}
        }
      }
      boards.set(currRoom, board);
      rooms.set(username, {room: currRoom, socket:socket.id});
      socket.join(currRoom)
    } 
  }

  // server updates board state and broadcasts the new board to the other player
  socket.on("try chess move", (newBoard:any) => {
    let room = rooms.get(username).room;
    let currLock = boards.get(room).lock;
    if (boards.get(room).players[currLock] == username) {
      let nextLock = (currLock + 1) % 2;
      let newBoardState = {...boards.get(room), lock: nextLock, board: newBoard};
      boards.set(room, newBoardState);
      // currently sends to both players
      io.in(room).emit("updated board", newBoard);
    } else {
      socket.emit("error message", "It is not your turn");
    }
  });

  socket.on("resign", () => {
    let room = rooms.get(username).room;
    io.in(room).emit("game resigned", username);
    boards.delete(room);
  });

  socket.on("try draw", () => {
    let room = rooms.get(username).room;
    socket.to(room).emit("draw request", username);
  });

  socket.on("draw accepted", () => {
    let room = rooms.get(username).room;
    io.in(room).emit("game drawed", username);
    boards.delete(room);
  });

  socket.on("draw rejected", () => {
    let room = rooms.get(username).room;
    socket.to(room).emit("draw request rejected", username); 
  });
});

io.of("/").adapter.on("delete-room", (room:any) => {  
  boards.delete(room);
});
