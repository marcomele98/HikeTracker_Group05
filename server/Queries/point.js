'use strict';

const db = require('./DAO');
const {PointStruct} = require("../Models/point_model");

exports.storePoint = async (point, hike_id) => {
    const sql = 'INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id) VALUES(?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [point.latitude, point.longitude, point.altitude, point.name, point.address, hike_id]);
    return result;
}


exports.getPoints = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from POINT';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const Points = rows.map(row => new PointStruct(row.id,row.latitude,row.longitude,row.altitude, row.name, 
                                        row.address, row.hike_id));
                resolve(Points);
            }
        });
    });
}

exports.getPointById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM POINT WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Point = row.map(row => new PointStruct(row.id,row.latitude,row.longitude,row.altitude, row.name, 
                                 row.address, row.hike_id));  
          resolve(Point);
        }
      });
    });
  };

  exports.getPointsByHikeId = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM POINT WHERE hike_id=?";
      db.get(sql, [id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        } else if (rows === undefined) {
          resolve(-1);
        } else {
          const Points = rows.map(row => new PointStruct(row.id,row.latitude,row.longitude,row.altitude, row.name, 
                                 row.address, row.hike_id));  
          resolve(Points);
        }
      });
    });
  };