import socketIO from 'socket.io-client';
const url = 'http://localhost:3001';

const socket = socketIO.connect(url);

export default socket;