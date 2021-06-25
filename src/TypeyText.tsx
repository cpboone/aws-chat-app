import React, { ReactElement, useState, useCallback, ChangeEvent } from 'react';
import { Button } from 'react-md';

export interface TypeyTextProps {
  onSendMessage(message: string): void;
}

export default function TypeyText({
  onSendMessage,
}: TypeyTextProps): ReactElement {
  const [message, setMessage] = useState('');
  const handleMessageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  }, []);
  const handleMessageSubmit = useCallback((event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage('');
  }, [onSendMessage, message]);
  return (
    <form id="send-message-form" className="message-input-form" name="message-send" autoComplete="off" onSubmit={handleMessageSubmit}>
      <input id="typey-text" className="typey-text" onChange={handleMessageChange} value={message} />
      <Button type="submit" id="send-message-btn" onClick={handleMessageSubmit}>Send</Button>
    </form>
  );
}
