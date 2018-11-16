// const fs = require('fs');
// const pg = require('pg');
// const copyFrom = require('pg-copy-streams').from;

// const cli = new pg.Client({ database: 'reservation_hours' });
// cli.connect((err, client, done) => {
//   const stream = client.query(copyFrom('COPY restaurants FROM STDIN CSV'));
//   const fileStream = fs.createReadStream('seedRestaurants.csv');
//   fileStream.on('error', done);
//   fileStream
//     .pipe(stream)
//     .on('finish', done)
//     .on('error', done);
// });

const { Client } = require('pg');

const client = new Client();

const test = async () => {
  await client.connect({ database: 'reservation_hours' });

  const res = await client.query('SELECT COUNT(*) FROM restaurants;', res);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
};

test();
