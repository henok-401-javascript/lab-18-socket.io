'use strict';

const sioc = require('socket.io-client');
const faker = require('faker');

const server = sioc.connect('http://localhost:3000');

setInterval(() => {
  server.on('pickup', (payload) => {
    console.log('Pick up order no.', payload.Id);
    server.emit('in-transit', payload);
  });
}, 1000);
setTimeout(() => {
  server.on('in-transit', (payload) => {
    console.log('delivered ', payload.Id);
    server.emit('delivered', payload);
  });
}, 3000);
