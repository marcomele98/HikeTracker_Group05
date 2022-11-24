'use strict';

const db = require('./DAO');


exports.getParkings = () => {
  const sql = 'SELECT * from PARKING_LOT';
  return db.all(sql, []);
}

exports.addParking = async (park) => {
  const sql = 'INSERT INTO PARKING_LOT(name,latitude, longitude, altitude,region, province, city) VALUES(?, ?, ?, ?, ?, ?, ?)'
  let result = await db.insert(sql, [park.name, park.latitude, park.longitude, park.altitude, park.region, park.province, park.city]);
  return result;
}

exports.getParkingById = (id) => {
  const sql = "SELECT * FROM PARKING_LOT WHERE id=?";
  return db.get(sql, [id]);
};
