export type RoomId = string;

export type Room = {
  roomId: RoomId;
  members: Set<string>; 
  sessions: Set<string>;   
  createdAt: number;
};

export const rooms = new Map<RoomId, Room>();