const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// boards maps room to BoardState (BoardState contains all data in regards to the state of the game) 
type BoardState = {
  lock: number;
  board: string;
  players: string[];
};
const boards = new Map<string, BoardState>(); 

// rooms maps username to RoomData (RoomData contains connection information for users)
type RoomData = {
  room: string;
  socket: string;
}
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
    let newSocket = {...rooms.get(username), socket: socket.id};
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
          board = {...board, players: [boards.get(currRoom).players[0], username]} 
        }
      }
      boards.set(currRoom, board);
      rooms.set(username, {room: currRoom, socket:socket.id});
      socket.join(currRoom)
    } 
  }

  // CLIENT WORKFLOW FOR ATTEMPTED MOVE
  // client A should emit "try chess move" and send the board state after the attempted move
  // if the move is successful, both clients should handle "updated board" event with the new board being sent 
  // otherwise, client A should handle "error message" event with an error message being sent 
  socket.on("try chess move", (newBoard:any) => {
    let room = rooms.get(username).room;
    let currLock = boards.get(room).lock;

    //Check if lock points to current client => update board state
    if (boards.get(room).players[currLock] == username) {
      let nextLock = (currLock + 1) % 2;
      let newBoardState = {...boards.get(room), lock: nextLock, board: newBoard};
      boards.set(room, newBoardState);
      io.in(room).emit("updated board", newBoard);
    } else {
      socket.emit("error message", "It is not your turn");
    }
  });

  // CLIENT WORKFLOW FOR RESIGNATION
  // client A should emit "resign" if they attempt to resign
  // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent 
  // the server will handle deletion of rooms
  socket.on("resign", () => {
    let room = rooms.get(username).room;
    io.in(room).emit("game resigned", username);
    rooms.delete(boards.get(room).players[0]);
    rooms.delete(boards.get(room).players[1]);
    boards.delete(room);
  });

  // CLIENT WORKFLOW FOR DRAWING
  // client A should emit "try draw" if they attempt to draw
  // client B should handle "draw request" event with the username of the client A being sent
  // if client B wants to accept the draw, client B should emit "draw accepted"
  //  in this case, both clients should handle "game drawn" event with username of client B being sent
  // if client B wants to decline the draw, client B should emit "draw rejected"
  //  in this case, client A should handle "draw request rejected" with username of client B being sent
  socket.on("try draw", () => {
    let room = rooms.get(username).room;
    socket.to(room).emit("draw request", username);
  });

  socket.on("draw accepted", () => {
    let room = rooms.get(username).room;
    io.in(room).emit("game drawn", username);
    rooms.delete(boards.get(room).players[0]);
    rooms.delete(boards.get(room).players[1]);
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