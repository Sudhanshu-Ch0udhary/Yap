import WebSocket from "ws";

const ws = new WebSocket("ws://127.0.0.1:8080");

ws.on("open", () => console.log("connected"));
ws.on("message", m => console.log(m.toString()));
ws.on("error", e => console.error(e));
