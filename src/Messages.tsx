import React, { ReactElement } from 'react';

import { ChatMessage } from './types';
import Message from './Message';
import TypeyText from './TypeyText';

export interface MessagesProps {
  chatMessages: ChatMessage[];
  onSendMessage(message: string): void;
}

export default function Messages({
  chatMessages,
  onSendMessage,
}: MessagesProps): ReactElement {
  return (
    <div id="messages" className="messages">
      <div id="messages-list" className="message-list">
        {chatMessages.map((message, index) => <Message index={index} key={index} chatMessage={message} />)}
      </div>
      <TypeyText onSendMessage={onSendMessage} />
    </div>
  );
}
