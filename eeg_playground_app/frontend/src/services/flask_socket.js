import socketIO from 'socket.io-client';
const url_model = 'http://127.0.0.1:5000'

const socket_model = socketIO.connect(url_model);

export default socket_model;