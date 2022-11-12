'use strict';

const db = require('./DAO');
const { HikeStruct, Hike_HutStruct, Hike_ParkingStruct} = require('../Models/hike_model');



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
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from HIKE';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const hikes = rows.map(row => new HikeStruct(row.id, row.title,row.length_kms,row.expected_mins,
                                       row.ascendent_meters,row.difficulty,row.region, row.city , row.lg_id, row.gpx,
                                       row.end_point, row.end_point_type, row.start_point, row.start_point_type));
                resolve(hikes);
            }
        });
    });
}

exports.getHikesHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from HIKE_HUT';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const hikeshuts = rows.map(row => new Hike_HutStruct(row.hike_id, row.hut_id));
                resolve(hikeshuts);
            }
        });
    });
}

exports.getHikesParkings = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from HIKE_PARKING';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const HikesParkings = rows.map(row => new Hike_ParkingStruct(row.hike_id, row.parking_id));
                resolve(HikesParkings);
            }
        });
    });
}

exports.getHikeById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM HIKE WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Hike = row.map(row => new HikeStruct(row.id, row.title,row.length_kms,row.expected_mins,
            row.ascendent_meters,row.difficulty,row.region, row.city , row.lg_id, row.gpx,
            row.end_point, row.end_point_type, row.start_point, row.start_point_type));  
          resolve(Hike);
        }
      });
    });
  };

  exports.getHikesHutsByHikeID = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT hut_id from HIKE_HUT WHERE hike_id=?';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else 
            {
                const hikeshuts = rows.map(row => new Hike_HutStruct(row.hike_id, row.hut_id));
                resolve(hikeshuts);
            }
        });
    });  
   };

   exports.getHikesParkingsByHikeID = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT parking_id from HIKE_PARKING WHERE hike_id=?';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else 
            {
                const hikeshuts = rows.map(row => new Hike_ParkingStruct(row.hike_id, row.hut_id));
                resolve(hikeshuts);
            }
        });
    });  
   };