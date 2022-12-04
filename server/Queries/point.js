'use strict';

const db = require('./DAO');


exports.storePoint = async (point, hike_id) => {
  const sql = 'INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id) VALUES(?, ?, ?, ?, ?, ?)'
  let result = await db.insert(sql, [point.latitude, point.longitude, point.altitude, point.name, point.address, hike_id]);
  return result;
}


exports.getPointById = (id) => {
  const sql = "SELECT * FROM POINT WHERE id=?";
  return db.get(sql, [id]);
};

exports.getPointsByHikeId = async (id) => {
  const sql = "SELECT * FROM POINT WHERE hike_id=?";
  return await db.all(sql, [id]);
};

exports.deletePointById = (id) => {
  const sql = "DELETE FROM POINT WHERE id = ?"
  return db.run(sql, [id]);
}