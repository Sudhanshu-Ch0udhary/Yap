import { randomUUID } from "crypto";

export const createUserId = () => `u_${randomUUID().slice(0, 8)}`;
export const createSessionId = () => `s_${randomUUID().slice(0, 8)}`;
