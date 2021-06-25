const SOCKET_URL = 'wss://hlsd2aiwx6.execute-api.us-east-1.amazonaws.com/production/';

const websocket = new WebSocket(SOCKET_URL);

websocket.onmessage((event) => {
  console.log('event: ', event);
});
