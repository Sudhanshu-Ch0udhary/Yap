import WebSocket from "ws";

export type Session = {
  sessionId: string;
  userId: string;
  socket: WebSocket;
  joinedRooms: Set<string>;
};

export const sessions = new Map<string, Session>();
