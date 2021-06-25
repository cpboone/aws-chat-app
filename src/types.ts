export interface ChatMessage {
  timestamp?: string;
  isBotMessage?: boolean;
  username: string;
  message: string;
}

