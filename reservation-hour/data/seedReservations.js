const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const reservationSeed = () => {
  const stream = fs.createWriteStream('data/reservations.csv');
  let i = 0;
  stream.write('reservee,time,restaurantId\n');
  function write() {
    while (i < 100000000) {
      // 100 million reservations
      const string =
        `${faker.name.findName()},` +
        `${moment(faker.date.recent(90)).format('YYYY-MM-DD hh:mm:ss')},` +
        `${faker.random.number(10000000)}\n`;
      i += 1;
      if (!stream.write(string)) {
        return;
      }
    }
    stream.end(console.log('complete seeding'));
  }
  stream.on('drain', () => {
    write();
  });
  write();
};

exports.reservationSeed = reservationSeed;
