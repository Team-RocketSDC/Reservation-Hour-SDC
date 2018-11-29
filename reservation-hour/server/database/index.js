// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   user: 'root',
//   database: 'reservation_hour',
// });

// connection.connect();

const cassandra = require('cassandra-driver');

const connection = new cassandra.Client({
  contactPoints: ['3.16.23.11:9042'],
  keyspace: 'restaurants',
});

connection.getCassHours = (id, callback) => {
  const query = `
  SELECT * FROM restaurants.hours WHERE id = ${id};
  `;
  connection.execute(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

connection.getCassReservations = (id, callback) => {
  const query = `
  SELECT * FROM restaurants.reservations WHERE id = ${id};
  `;
  connection.execute(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// connection.addReservation = (reservee, time, restaurantId, callback) => {
//   const query = `
//     UPDATE restaurants.reservations SET reservations = reservations + [{reservee:${reservee},time:${time}}] WHERE id = ${restaurantId};
//   `;
//   connection.execute(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// unused rest api calls

// connection.getReservations = (id, callback) => {
//   const query = `
//     SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation
//     INNER JOIN restaurant ON reservation.restaurantId = restaurant.id
//     WHERE restaurantId = ${id}
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.getHours = (id, callback) => {
//   const query = `
//     SELECT hour.weekday,hour.openingHour,hour.closingHour,restaurant.name FROM hour
//     INNER JOIN restaurant ON hour.restaurantId = restaurant.id
//     WHERE restaurantId = ${id}
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.deleteReservation = (reservee, time, restaurantId, callback) => {
//   const query = `
//     DELETE FROM reservation WHERE reservee = ${reservee} AND time = ${time} AND restaurantId = ${restaurantId};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.updateReservation = (reservee, time, restaurantId, callback) => {
//   const query = `
//     UPDATE reservation SET time = ${time} WHERE reservee = ${reservee} AND restaurantId = ${restaurantId};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.updateRestaurant = (name, id, callback) => {
//   const query = `
//     UPDATE restaurant SET name = ${name} WHERE id = ${id};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.updateHour = (
//   weekday,
//   openingHour,
//   closingHour,
//   restaurantId,
//   callback,
// ) => {
//   const query = `
//     UPDATE hour SET openingHour = ${openingHour}, closingHour = ${closingHour} WHERE weekday = ${weekday} AND restaurantId = ${restaurantId};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.deleteHour = (weekday, restaurantId, callback) => {
//   const query = `
//     DELETE FROM hour WHERE weekday = ${weekday} AND restaurantId = ${restaurantId};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.deleteRestaurant = (name, id, callback) => {
//   const query = `
//     DELETE FROM restaurant WHERE name = ${name} AND id= ${id};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.addHour = (
//   weekday,
//   openingHour,
//   closingHour,
//   restaurantId,
//   callback,
// ) => {
//   const query = `
//     INSERT INTO hour ( weekday, openingHour, closingHour, restaurantId )
//     VALUES
//     ( ${weekday}, ${openingHour}, ${closingHour}, ${restaurantId} );
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.addRestaurant = (restaurant, callback) => {
//   const query = `
//     INSERT INTO restaurant ( name )
//     VALUES
//     ( ${restaurant} );
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

// connection.getCassHours = (id, callback) => {
//   const query = `
//   SELECT * FROM restaurants.restaurants_hours WHERE id = ${id};
//   `;
//   connection.query(query, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

module.exports = connection;
