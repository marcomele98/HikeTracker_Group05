'use strict';

const db = require('./DAO');
const sqlite = require('sqlite3');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});
const { HikeStruct, Hike_HutStruct, Hike_ParkingStruct} = require('../Models/hike_model');
const { HutStruct} = require('../Models/hut_model');
const { ParkingStruct} = require('../Models/parking_model');



exports.newHike = async (hike, lg_id) => {
    const sql = 'INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, lg_id, gpx) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [hike.title, hike.length_kms, hike.expected_mins, hike.ascendent_meters, hike.difficulty, hike.region, hike.city, lg_id, hike.gpx]);
    return result;
}

exports.updateHike = async (end_point, start_point, type, hike_id) => {
    const sql = 'UPDATE HIKE SET end_point = ?, end_point_type = ?, start_point = ?, start_point_type = ?  WHERE ID = ?';
    return db.run(sql, [end_point, type, start_point, type, hike_id]);
}

exports.getHikes = () => {
        const sql = 'SELECT * FROM HIKE';
        return db.all(sql,[]);
}

exports.getHikesHuts = () => {
        const sql = 'SELECT * from HIKE_HUT';
        return db.all(sql,[]);
}

exports.getHikesParkings = () => {
   
        const sql = 'SELECT * from HIKE_PARKING';
        return db.all(sql,[]);
}

exports.getHikeById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM HIKE WHERE id=?";
      db1.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Hike = new HikeStruct(row.id, row.title,row.length_kms,row.expected_mins,
            row.ascendent_meters,row.difficulty,row.region, row.city , row.lg_id, row.gpx,
            row.end_point, row.end_point_type, row.start_point, row.start_point_type);  
            //console.log(Hike);
          resolve(Hike);
        }
      });
    });
  };

  exports.getHikesHutsByHikeID = async  (id) => {
    
        const sql = 'SELECT hut_id from HIKE_HUT WHERE hike_id=?';
        return  db.all(sql, [id]);
   };

   exports.getHikesParkingsByHikeID = async (id) => {
        const sql = 'SELECT parking_id from HIKE_PARKING WHERE hike_id=?';
        return await db.all(sql, [id]);
        
   };

  