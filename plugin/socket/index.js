import config from '../../config.js';
// import ioClient from './wxapp-socket.io-client';
// import ioClient from './socket.io-wxapp';
// import ioClient from './weapp.socket.io';
import ioClient from './socket.io-mp';

function socket() {
  const socket = ioClient(config.host, {
    path: config.socketPath,
    transports: ['websocket'],
    autoConnect: false,
    forceNew: true
  });
  return socket;
}
export default socket;
