'use strict';

const sio = require('socket.io');
const server = sio(3000);

const newRoomFlower = server.of('/csps');

server.on('connection', (socket) => {
  console.log('Socket', socket.id);
});

newRoomFlower.on('connection', (socket) => {
  console.log('socket connected ', socket.id);

  socket.on('join', (payload) => {
    socket.join(payload);
  });

  socket.on('pickup', (payload) => {
    console.log('Pick Up');
    console.log('Time:', new Date());
    console.log('Store:', payload.Store);
    console.log('OrderId:', payload.Id);
    console.log('Customer:', payload.CustomerName);
    console.log('Address:', payload.Address);

    newRoomFlower.to('orders').emit('pickup', payload);
  });

  newRoomFlower.on('delivered', (payload) => {
    newRoomFlower.to(payload.Store).emit('delivered', payload);
    console.log('Delivered Order No.', payload.Id);
  });
});
