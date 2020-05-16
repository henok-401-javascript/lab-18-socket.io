'use strict';

const sio = require('socket.io');
const server = sio(3000);

server.on('connection', (socket) => {
  console.log('Socket', socket.id);
  socket.on('pickup', (payload) => {
    console.log('Pick Up');
    console.log('Time:', new Date());
    console.log('Store:', payload.Store);
    console.log('OrderId:', payload.Id);
    console.log('Customer:', payload.CustomerName);
    console.log('Address:', payload.Address);
  });
  // socket.on('flowerHandler', (payload) => {
  //   console.log('socket 001 joined room flower-shop', payload);
  // });
  socket.on('in-transit', (payload) => {
    console.log('in-transit', payload.Id);
  });
  socket.on('delivered', (payload) => {
    console.log('Delivered Order No.', payload.Id);
  });
});

const newRoomFlower = server.of('/flower-shop');

newRoomFlower.on('connection', (socket) => {
  console.log('socket 001 joined room ', socket.id);
  newRoomFlower.on('pickup', (payload) => {
    console.log('Pick Up');
    console.log('Time:', new Date());
    console.log('Store:', payload.Store);
    console.log('OrderId:', payload.Id);
    console.log('Customer:', payload.CustomerName);
    console.log('Address:', payload.Address);
  });
  newRoomFlower.on('in-transit', (payload) => {
    console.log('in-transit', payload.Id);
  });
  newRoomFlower.on('delivered', (payload) => {
    console.log('Delivered Order No.', payload.Id);
  });
});
