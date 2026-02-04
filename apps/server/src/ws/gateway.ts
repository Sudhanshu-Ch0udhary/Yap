import WebSocket, { WebSocketServer } from "ws";
import { createSessionId, createUserId } from "../utils/id";
import { sessions } from "../state/session";
import { WSMessage } from "./types";

function handleMessage(sessionId: string, msg: any) {
  const session = sessions.get(sessionId);
  if (!session) return;
  
  switch (msg.type) {
    case "PING":
      session.socket.send(
        JSON.stringify({ type: "PONG" })
      );
      break;

    default:
      console.warn("[ws] unknown message type:", msg.type);
  }
}


export const createWSServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  console.log(`[ws] WebSocket server running on port ${port}`);

  wss.on("connection", (socket: WebSocket) => {
    const sessionId = createSessionId();
    const userId = createUserId();

    sessions.set(sessionId, {
      sessionId,
      userId,
      socket,
    });

    console.log(`[ws] connected: ${sessionId} (${userId})`);

    const message: WSMessage = {
      type: "CONNECTED",
      payload: {
        sessionId,
        userId,
      },
      meta: {
        timestamp: Date.now(),
      },
    };

    socket.send(JSON.stringify(message));

    socket.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString());
        handleMessage(sessionId, msg);
      } catch (err) {
        console.error("[ws] invalid message", err);
      }
    });


    socket.on("close", () => {
      console.log(`[ws] disconnected: ${sessionId}`);
      sessions.delete(sessionId);
    });

    socket.on("error", (err) => {
      console.error(`[ws] error: ${sessionId}`, err);
    });
  });
};
