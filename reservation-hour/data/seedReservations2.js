const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const uuidv1 = require('uuid/v1');

const genTimes = () => `0${faker.random.number({
    min: 5,
    max: 9,
  })}:00:00 - ${faker.random.number({ min: 15, max: 24 })}:00:00`;

const genRes = () => {
  const reservations = [];
  // const reservations = {};
  for (let i = 0; i < 10; i += 1) {
    // const name = faker.name.findName().replace(/'/g, '');
    // const time = moment(faker.date.recent(90)).format('YYYY-MM-DD hh:mm:ss');
    // reservations[name] = time;
    const reservation = {
      reservee: faker.name.findName().replace(/'/g, ''),
      time: moment(faker.date.recent(90)).format('YYYY-MM-DD hh:mm:ss'),
    };
    // reservations.push(`'${JSON.stringify(reservation).replace(/"/g, '')}'`);
    reservations.push(reservation);
  }
  return reservations;
};

const hoursSeed = () => {
  // const stream = fs.createWriteStream('hourstest2.csv');
  faker.seed(123);
  const stream1 = fs.createWriteStream('hours3.csv');
  let i = 2000000;
  // stream.write('id|name|reservations\n');
  stream1.write(
    'id|name|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday\n',
  );
  function write() {
    while (i < 3000000) {
      // 10 million hours
      i += 1;
      // const id = uuidv1();
      const name = faker.commerce.productName();
      const reservations = genRes();
      const monday = genTimes();
      const tuesday = genTimes();
      const wednesday = genTimes();
      const thursday = genTimes();
      const friday = genTimes();
      const saturday = genTimes();
      const sunday = genTimes();
      // const string = `${id}|${name}|[${genRes()}]\n`;
      const string1 = `${i}|${name}|${monday}|${tuesday}|${wednesday}|${thursday}|${friday}|${saturday}|${sunday}\n`;
      if (!stream1.write(string1)) {
        return;
      }
    }
    stream1.end();
  }
  stream1.on('drain', () => {
    write();
  });
  write();
};

const resSeed = () => {
  faker.seed(123);
  const stream = fs.createWriteStream('reservations4.csv');
  // const stream1 = fs.createWriteStream('hourstest3.csv');
  let i = 0;
  stream.write('id|name|reservee|time\n');
  // stream1.write(
  //   'id|name|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday\n'
  // );

  function write() {
    while (i < 10000000) {
      // 10 million hours
      i += 1;
      // const name = faker.commerce.productName();
      const name = faker.commerce.productName();
      const reservations = genRes();
      const monday = genTimes();
      const tuesday = genTimes();
      const wednesday = genTimes();
      const thursday = genTimes();
      const friday = genTimes();
      const saturday = genTimes();
      const sunday = genTimes();
      const string = `${i}|${name}|${reservations[0].reservee}|${
        reservations[0].time
      }\n${i}|${name}|${reservations[1].reservee}|${
        reservations[1].time
      }\n${i}|${name}|${reservations[2].reservee}|${
        reservations[2].time
      }\n${i}|${name}|${reservations[3].reservee}|${
        reservations[3].time
      }\n${i}|${name}|${reservations[4].reservee}|${
        reservations[4].time
      }\n${i}|${name}|${reservations[5].reservee}|${
        reservations[5].time
      }\n${i}|${name}|${reservations[6].reservee}|${
        reservations[6].time
      }\n${i}|${name}|${reservations[7].reservee}|${
        reservations[7].time
      }\n${i}|${name}|${reservations[8].reservee}|${
        reservations[8].time
      }\n${i}|${name}|${reservations[9].reservee}|${reservations[9].time}\n`;
      // const string1 = `${id}|${name}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}|${genTimes()}\n`;
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

resSeed();

exports.resSeed = resSeed;
