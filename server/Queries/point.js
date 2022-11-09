'use strict';

const db = require('./DAO');

exports.storePoint = async (point, hike_id) => {
    const sql = 'INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id) VALUES(?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [point.latitude, point.longitude, point.altitude, point.name, point.address, hike_id]);
    return result;
}