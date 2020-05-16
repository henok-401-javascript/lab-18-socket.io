'use strict';

const sio = require('socket.io');
const server = sio(3000);

server.on('connection', (socket) => {
  console.log('Socket', socket.id);
});

const newRoomFlower = server.of('/csps');

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
    console.log('in-transit:', payload.Id);
    console.log('Delivered order:', payload.Id);
    console.log('----------------------------------');
    newRoomFlower.to('orders').emit('pickup', payload);
  });

  socket.on('delivered', (payload) => {
    newRoomFlower.to(payload.Store).emit('delivered', payload);
  });
});
