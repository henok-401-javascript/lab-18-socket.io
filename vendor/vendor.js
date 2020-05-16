'ust strict';

const faker = require('faker');

const sioc = require('socket.io-client');

const flowerShop = sioc.connect('http://localhost:3000/csps');
const candyShop = sioc.connect('http://localhost:3000/csps');

// server.on('delivered', (payload) => {
//   console.log('Thank you !!!!', payload.Id);
// });
// server.join('flower-shop');
// server.join('candy-shop');
flowerShop.emit('join', 'flower-shop');
candyShop.emit('join', 'candy-shop');

flowerShop.on('delivered', (payload) => {
  console.log('flowerShop: Thank you ', payload.Id);
});
candyShop.on('delivered', (payload) => {
  console.log('candyShop: Thank you ', payload.Id);
});

setInterval(() => {
  let Store = 'flower-shop';
  let Id = faker.random.number();
  let CustomerName = faker.name.firstName() + ' ' + faker.name.lastName();
  let Address =
    faker.address.streetAddress() +
    ' ' +
    faker.address.city() +
    ' ' +
    faker.address.state() +
    ' ' +
    faker.address.zipCode();

  let payload = { Store, Id, CustomerName, Address };
  flowerShop.emit('pickup', payload);
  // server.to('flower-shop', emit('flowerHandler', 'FLOWER STORE!!'));
}, 5000);
setTimeout(() => {
  setInterval(() => {
    let Store = 'candy-shop';
    let Id = faker.random.number();
    let CustomerName = faker.name.firstName() + ' ' + faker.name.lastName();
    let Address =
      faker.address.streetAddress() +
      ' ' +
      faker.address.city() +
      ' ' +
      faker.address.state() +
      ' ' +
      faker.address.zipCode();

    let payload = { Store, Id, CustomerName, Address };
    candyShop.emit('pickup', payload);

    // server.to('candy-shop', emit('CandyHandler', 'CANDY STORE!!'));
  }, 5000);
}, 3000);
