const fs = require('fs');
const faker = require('faker');

const genTimesMorning = () =>
  `${faker.random.number({
    min: 5,
    max: 10
  })}:00:00s`;

const genTimesEvening = () =>
  `${faker.random.number({
    min: 15,
    max: 24
  })}:00:00s`;

const hoursCassSeed = () => {
  const stream = fs.createWriteStream('data/hours.csv');
  let i = 0;
  stream.write(
    'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday,restaurantId\n'
  );
  function write() {
    while (i < 10000000) {
      // 10 million hours
      const string = `${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${genTimes()},${faker.random.number(
        10000000
      )}\n`;
      i += 1;
      if (!stream.write(string)) {
        return;
      }
    }
    stream.end(reservationSeed());
  }
  stream.on('drain', () => {
    write();
  });
  write();
};

exports.hoursSeed = hoursCassSeed;
