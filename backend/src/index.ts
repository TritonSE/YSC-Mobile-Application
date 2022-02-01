const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Currently locks are socket.id's. Will change to base them off of usernames
type BoardState = {
  lock: string;
  board: string;
};
const boards = new Map();
let currRoom = 0;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

io.on("connection", (socket:any) => {

  // socket only has socket ID room => create new room
  if(socket.rooms.size == 1) {
    if(io.sockets.adapter.rooms.get(currRoom) == null) {
      boards.set(currRoom, {lock: socket.id, board: ""});
    } else if(io.sockets.adapter.rooms.get(currRoom).size == 2) {
      currRoom++;
      boards.set(currRoom, { lock: socket.id, board: ""});
    }
    socket.join(currRoom)
  } 

  // server updates board state and broadcasts the new board to the other player
  socket.on("try chess move", (newBoard:any) => {
    let room = Array.from(socket.rooms).find(e => e != socket.id);
    if (boards.get(room).lock == socket.id) {
      let nextLock = Array.from(io.sockets.adapter.rooms.get(room)).find(e => e != socket.id);
      boards.set(room, {lock: nextLock, board: newBoard});
      // currently sends to both players
      io.in(room).emit("updated board", newBoard);
    } else {
      socket.emit("error message", "It is not your turn");
    }
  });

  socket.on("resign", () => {
    let room = Array.from(socket.rooms).find(e => e != socket.id);
    io.in(room).emit("game resigned", socket.id);
    boards.delete(room);
  });

  socket.on("try draw", () => {
    let room = Array.from(socket.rooms).find(e => e != socket.id);
    socket.to(room).emit("draw request", socket.id);
  });

  socket.on("draw accepted", () => {
    let room = Array.from(socket.rooms).find(e => e != socket.id);
    io.in(room).emit("game drawed", socket.id);
    boards.delete(room);
  });

  socket.on("draw rejected", () => {
    let room = Array.from(socket.rooms).find(e => e != socket.id);
    socket.to(room).emit("draw request rejected", socket.id); 
  });
});

io.of("/").adapter.on("delete-room", (room:any) => {  
  boards.delete(room);
});
