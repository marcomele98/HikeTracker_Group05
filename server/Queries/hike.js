'use strict';

const db = require('./DAO');
const sqlite = require('sqlite3');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});




exports.newHike = async (hike, lg_id) => {
    const sql = 'INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [hike.title, hike.length_kms, hike.expected_mins, hike.ascendent_meters, hike.difficulty, hike.description, hike.region, hike.province.toUpperCase(), hike.city, lg_id, hike.gpx]);
    return result;
}

exports.updateHike = async (end_point, type_end, start_point, type_start, hike_id) => {
    const sql = 'UPDATE HIKE SET end_point = ?, end_point_type = ?, start_point = ?, start_point_type = ?  WHERE ID = ?';
    return db.run(sql, [end_point, type_end, start_point, type_start, hike_id]);
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
    // return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM HIKE WHERE id=?";
      return  db.get(sql, [id]);
    //   db1.get(sql, [id], (err, row) => {
    //     if (err) {
    //       reject(err);
    //       return;
    //     } else if (row === undefined) {
    //       resolve(-1);
    //     } else {
    //       resolve(row);
    //     }
    //   });
    // });
  };

  exports.getHikesHutsByHikeID = async  (id) => {
    
        const sql = 'SELECT hut_id from HIKE_HUT WHERE hike_id=?';
        return  db.all(sql, [id]);
   };

   exports.getHikesParkingsByHikeID = async (id) => {
        const sql = 'SELECT parking_id from HIKE_PARKING WHERE hike_id=?';
        return await db.all(sql, [id]);
        
   };

  