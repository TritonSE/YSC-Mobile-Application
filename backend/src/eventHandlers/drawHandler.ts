import type {RoomData, BoardState} from "../types";

exports = function(socket:any, io:any, username:string, rooms:Map<string,RoomData>, boards:Map<string,BoardState>) {
    // CLIENT WORKFLOW FOR DRAWING
    // client A should emit "try draw" if they attempt to draw
    // client B should handle "draw request" event with the username of the client A being sent
    // if client B wants to accept the draw, client B should emit "draw accepted"
    //  in this case, both clients should handle "game drawn" event with username of client B being sent
    // if client B wants to decline the draw, client B should emit "draw rejected"
    //  in this case, client A should handle "draw request rejected" with username of client B being sent
    socket.on("try draw", () => {
        let room = rooms.get(username)!.room;
        socket.to(room).emit("draw request", username);
    });

    socket.on("draw accepted", () => {
        let room = rooms.get(username)!.room;
        io.in(room).emit("game drawn", username);
        rooms.delete(boards.get(room)!.players[0]);
        rooms.delete(boards.get(room)!.players[1]);
        boards.delete(room);
    });

    socket.on("draw rejected", () => {
        let room = rooms.get(username)!.room;
        socket.to(room).emit("draw request rejected", username); 
    });
}