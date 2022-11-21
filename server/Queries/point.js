'use strict';

const db = require('./DAO');
const sqlite = require('sqlite3');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});
// const {PointStruct} = require("../Models/point_model");

exports.storePoint = async (point, hike_id) => {
    const sql = 'INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id) VALUES(?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [point.latitude, point.longitude, point.altitude, point.name, point.address, hike_id]);
    return result;
}


exports.getPoints = () => {
        const sql = 'SELECT * from POINT';
        db.all(sql, []);
}

exports.getPointById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM POINT WHERE id=?";
      db1.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          // const Point = new PointStruct(row.id,row.latitude,row.longitude,row.altitude, row.name, 
          //                        row.address, row.hike_id);  
          resolve(row);
        }
      });
    });
  };

  exports.getPointsByHikeId = async (id) => {
      const sql = "SELECT * FROM POINT WHERE hike_id=?";
      return await db.all(sql, [id]);
  };