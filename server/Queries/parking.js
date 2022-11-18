'use strict';

const sqlite = require('sqlite3');
const db = require('./DAO');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});
const {ParkingStruct} = require("../Models/parking_model");


exports.getParkings = () => {
        const sql = 'SELECT * from PARKING_LOT';
        return db.all(sql, []);
}

exports.addParking = async (park) => {
  const sql = 'INSERT INTO PARKING_LOT(latitude, longitude, altitude, name, region, province, city) VALUES(?, ?, ?, ?, ?, ?, ?)'
  let result = await db.insert(sql, [park.latitude, park.longitude, park.altitude, park.name, park.region, park.province, park.city]);
  return result;
}

exports.getParkingById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM PARKING_LOT WHERE id=?";
      db1.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          resolve(row);
        }
      });
    });
  };
