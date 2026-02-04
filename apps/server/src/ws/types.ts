export interface WSMessage<T = any> {
  type: string;
  payload?: T;
  meta?: {
    requestId?: string;
    timestamp?: number;
  };
}
