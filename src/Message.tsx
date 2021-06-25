import React, { ReactElement, useEffect } from 'react';
import cn from 'classnames';

import { ChatMessage } from './types';

export interface MessageProps {
  index: number;
  chatMessage: ChatMessage;
}

export default function Message({
  index,
  chatMessage,
}: MessageProps): ReactElement {
  const id = `sent-message-${index}`;
  const { username, message, isBotMessage } = chatMessage;

  useEffect(() => {
    const parentEl = document.getElementById('messages-list');
    if (!parentEl) {
      return;
    }
    parentEl.scrollTo(0, parentEl.scrollHeight);
  }, []);

  return (
    <span id={`${id}-container`} className="message">
      <label htmlFor={id} className="message-label">{username}</label>
      <span id={id} className={cn({
        'message-text--bot': isBotMessage,
      }, 'message-text')}>{message}</span>
    </span>
  );
}
