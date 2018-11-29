const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const uuidv1 = require('uuid/v1');

const genTimes = () =>
  `${faker.random.number({
    min: 5,
    max: 10
  })}:00:00 - ${faker.random.number({ min: 15, max: 24 })}:00:00`;

const genRes = () => {
  const reservations = [];
  for (let i = 0; i < 10; i += 1) {
    const reservation = {
      reservee: faker.name.findName().replace(/'/g, ''),
      time: moment(faker.date.recent(90)).format('YYYY-MM-DD hh:mm:ss')
    };
    reservations.push(`'${JSON.stringify(reservation).replace(/"/g, '')}'`);
  }
  return reservations;
};

const hoursSeed = () => {
  const stream = fs.createWriteStream('hourstest2.csv');
  let i = 0;
  stream.write('id|name|reservations\n');
  function write() {
    while (i < 10) {
      // 10 million hours
      i += 1;
      const string = `${uuidv1()}|${faker.commerce.productName()}|[${genRes()}]\n`;
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
