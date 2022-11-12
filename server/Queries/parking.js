'use strict';

const db = require('./DAO');

const {ParkingStruct} = require("../Models/parking_model");


exports.getParkings = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from PARKING_LOT';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const Parkings = rows.map(row => new ParkingStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));
                resolve(Parkings);
            }
        });
    });
}

exports.getParkingById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM PARKING_LOT WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Parking = row.map(row => new ParkingStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));  
          resolve(Parking);
        }
      });
    });
  };
