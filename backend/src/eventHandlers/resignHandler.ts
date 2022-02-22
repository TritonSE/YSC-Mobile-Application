import type {RoomData, BoardState} from "../types";

exports = function(socket:any, io:any, username:string, rooms:Map<string,RoomData>, boards:Map<string,BoardState>) {

    // CLIENT WORKFLOW FOR RESIGNATION
    // client A should emit "resign" if they attempt to resign
    // all resignations are successful and both clients should handle "game resigned" event with the username of client A being sent 
    // the server will handle deletion of rooms
    socket.on("resign", () => {
        let room = rooms.get(username)!.room;
        io.in(room).emit("game resigned", username);
        rooms.delete(boards.get(room)!.players[0]);
        rooms.delete(boards.get(room)!.players[1]);
        boards.delete(room);
    });
};