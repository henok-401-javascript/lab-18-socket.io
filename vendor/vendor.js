'ust strict';

const faker = require('faker');

const sioc = require('socket.io-client');

const server = sioc.connect('http://localhost:3000');

server.on('delivered', (payload) => {
  console.log('Thank you !!!!', payload.Id);
});
// server.join('flower-shop');
// server.join('candy-shop');

setInterval(() => {
  let Store = faker.company.companyName();
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
  server.emit('pickup', payload);
  server.to('flower-shop', emit('flowerHandler', 'FLOWER STORE!!'));
}, 3000);

// setInterval(() => {
//   let Store = faker.company.companyName();
//   let Id = faker.random.number();
//   let CustomerName = faker.name.firstName() + ' ' + faker.name.lastName();
//   let Address =
//     faker.address.streetAddress() +
//     ' ' +
//     faker.address.city() +
//     ' ' +
//     faker.address.state() +
//     ' ' +
//     faker.address.zipCode();

//   let payload = { Store, Id, CustomerName, Address };
//   server.emit('pickup', payload);

//   server.to('candy-shop', emit('CandyHandler', 'CANDY STORE!!'));
// }, 3000);
