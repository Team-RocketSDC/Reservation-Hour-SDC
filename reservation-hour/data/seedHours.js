const fs = require('fs');
const faker = require('faker');
const { reservationSeed } = require('./seedReservations.js');

const genTimes = () => `${faker.random.number({
    min: 5,
    max: 10,
  })}:00:00 - ${faker.random.number({ min: 15, max: 24 })}:00:00`;

const hoursSeed = () => {
  const stream = fs.createWriteStream('hourstest.csv');
  let i = 0;
  stream.write(
    'id,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday,restaurantId\n',
  );
  function write() {
    while (i < 10000000) {
      // 10 million hours
      i += 1;
      const string = `${i},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${i}\n`;
      if (!stream.write(string)) {
        return;
      }
    }
    stream.end();
  }
  stream.on('drain', () => {
    write();
  });
  write();
};

hoursSeed();

exports.hoursSeed = hoursSeed;
