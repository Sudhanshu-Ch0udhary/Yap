import { createWSServer } from "./ws/gateway";

const PORT = Number(process.env.PORT) || 8080;

createWSServer(PORT);
