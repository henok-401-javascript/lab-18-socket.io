'use strict';

const sioc = require('socket.io-client');
const driverServer = sioc.connect('http://localhost:3000/csps');

driverServer.emit('join', 'orders');

driverServer.on('pickup', (payload) => {
  setInterval(() => {
    console.log('Pick up order no.', payload.Id);

    driverServer.emit('in-transit', payload);
    console.log('in-transit', payload.Id);
    setTimeout(() => {
      driverServer.emit('delivered', payload);
      console.log('delivered', payload.Id);
    }, 3000);
  }, 1000);
});
