'use strict';

const db = require('./DAO');


exports.newHike = async (hike, lg_id) => {
    const sql = 'INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, lg_id, gpx) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [hike.title, hike.length_kms, hike.expected_mins, hike.ascendent_meters, hike.difficulty, hike.region.toUpperCase(), hike.city, lg_id, hike.gpx]);
    return result;
}

exports.updateHike = async (end_point, start_point, type, hike_id) => {
    const sql = 'UPDATE HIKE SET end_point = ?, end_point_type = ?, start_point = ?, start_point_type = ?  WHERE ID = ?';
    return db.run(sql, [end_point, type, start_point, type, hike_id]);
}
