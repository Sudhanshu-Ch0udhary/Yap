import WebSocket from "ws";

export type Session = {
  sessionId: string;
  userId: string;
  socket: WebSocket;
};

export const sessions = new Map<string, Session>();
