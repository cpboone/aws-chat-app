import React, { useState, useEffect, useCallback } from 'react';

import { ChatMessage } from './types';
import NameYourself from './NameYourself';
import Messages from './Messages';

import './App.css';

const SOCKET_URL = 'wss://hlsd2aiwx6.execute-api.us-east-1.amazonaws.com/production/';
const websocketClient = new WebSocket(SOCKET_URL);

const BOT_NAME = 'WelcomeBot';

function sendMessage(message: string, username: string = BOT_NAME): void {
  websocketClient.send(JSON.stringify({ action: 'sendMessage', username, message, isBotMessage: username === BOT_NAME }));
}

const MESSAGES: ChatMessage[] = [
  { username: 'WelcomeBot', message: 'Welcome! Have fun!', timestamp: new Date().toString() },
];

function App() {
  const [isNameChallengeVisible, setNameChallengeVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(MESSAGES);

  const handleSendMessage = useCallback((message: string) => {
    sendMessage(message, username);
  }, [username]);

  const handleChallengeSubmit = useCallback((name: string) => {
    sendMessage(`${name} just entered chat`);
    setUsername(name);
    setNameChallengeVisible(false);
  }, []);

  useEffect(() => {
    setNameChallengeVisible(true);
    websocketClient.onopen = () => {
      setIsConnected(true);
    };
  }, []);

  useEffect(() => {
    websocketClient.onmessage = (event) => {
      const { message, username, isBotMessage } = JSON.parse(event.data);
      if (!username || !message) {
        return;
      }
      const chatMessage = { message, username, isBotMessage, timestamp: new Date().getTime().toString() };
      setMessages([...messages, chatMessage]);
    };
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <header className="app-header">
        Hi {username}!
      </header>
      <Messages chatMessages={messages} onSendMessage={handleSendMessage} />
      <NameYourself isVisible={isNameChallengeVisible} isConnected={isConnected} onSubmitUsername={handleChallengeSubmit} />
    </div>
  );
}

export default App;
