'use strict';

const sqlite = require('sqlite3');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});
const {ParkingStruct} = require("../Models/parking_model");


exports.getParkings = () => {
   // return new Promise((resolve, reject) => {
        const sql = 'SELECT * from PARKING_LOT';
        return db.all(sql, []);
        /*db1.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const Parkings = rows.map(row => new ParkingStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));
                resolve(Parkings);
            }
        });*/
    //});
}

exports.getParkingById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM PARKING_LOT WHERE id=?";
      //return db.get(sql, [id]);
      db1.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Parking = new ParkingStruct(row.id,row.name,row.latitude,row.longitude,row.altitude);  
          //console.log(Parking);
          resolve(Parking);
        }
      });
    });
  };
