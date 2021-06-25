import React, { ReactElement, useState, useCallback, ChangeEvent } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  Text,
  Button,
} from 'react-md';

export interface NameYourselfProps {
  isVisible: boolean;
  isConnected: boolean;
  onSubmitUsername(username: string): void;
}

export default function NameYourself({
  isVisible,
  isConnected,
  onSubmitUsername,
}: NameYourselfProps): ReactElement {
  const [username, setUsername] = useState('');
  const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  }, []);
  const handleSubmit = useCallback(() => {
    onSubmitUsername(username);
  }, [onSubmitUsername, username]);

  return (
    <Dialog
      id="name-yourself-dialog"
      visible={isVisible}
      onRequestClose={() => {}}
      aria-labelledby="name-yourself-dialog-title"
      className="name-yourself"
    >
      <DialogHeader>
        <DialogTitle id="name-yourself-dialog-title">Name Yourself!</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {isConnected ? (
          <>
            <Text margin="none">What's your name bud?</Text>
            <input id="name-yourself-dialog-username" value={username} onChange={handleUsernameChange} />
          </>
        ) : (
          <Text margin="none">Please wait while we connect to the service...</Text>
        )}
      </DialogContent>
      <DialogFooter>
        <Button disabled={!isConnected} id="name-yourself-dialog-submit" onClick={handleSubmit}>
          Let's Go!
        </Button>
      </DialogFooter>
    </Dialog>
    );
}
