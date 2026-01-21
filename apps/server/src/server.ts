import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    socket.send(data.toString());
  });
});

console.log("WS server running on ws://localhost:3001");
