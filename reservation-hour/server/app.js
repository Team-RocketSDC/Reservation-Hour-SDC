const path = require('path');
const express = require('express');
const compression = require('compression');
const db = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

app.use(express.static('build'));
app.use(
  compression({
    level: 2, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/api/:restaurant_id/reservation', (req, res) => {
  const id = req.params.restaurant_id;
  db.getReservations(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/api/:restaurant_id/hour', (req, res) => {
  const id = req.params.restaurant_id;
  db.getHours(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/:restaurant_id/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/:restaurant_id/reservation', (req, res) => {
  db.addReservation(
    req.body.reservee,
    req.body.time,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.post('/api/:restaurant_id/hour', (req, res) => {
  db.addHour(
    req.body.weekday,
    req.body.openingHour,
    req.body.closingHour,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.post('/api/restaurant', (req, res) => {
  db.addRestaurant(req.body.restaurant, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/api/:restaurant_id/reservation', (req, res) => {
  db.updateReservation(
    req.body.reservee,
    req.body.time,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.put('/api/:restaurant_id', (req, res) => {
  db.updateRestaurant(
    req.body.restaurant,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.put('/api/:restaurant_id/hour', (req, res) => {
  db.updateHour(
    req.body.weekday,
    req.body.openingHour,
    req.body.closingHour,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.delete('/api/:restaurant_id/reservation', (req, res) => {
  db.deleteReservation(
    req.body.reservee,
    req.body.time,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.delete('/api/:restaurant_id/hour', (req, res) => {
  db.deleteHour(req.body.weekday, req.params.restaurant_id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/api/:restaurant_id', (req, res) => {
  db.deleteRestaurant(
    req.body.name,
    req.params.restaurant_id,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

app.listen(5882);
