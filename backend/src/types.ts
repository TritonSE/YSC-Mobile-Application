type RoomData = {
  room: string;
  socket: string;
};
type BoardState = {
  lock: number;
  board: string;
  players: string[];
};

export { RoomData, BoardState };
