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

exports.newRefPointHiker = async (point_id, hiker_id, time) => {
  const sql = "INSERT INTO HIKER_POINT(point_id, hiker_id, time)\
                  VALUES(?, ?, ?)"
  let result = db.insert(sql, [point_id, hiker_id, time]);
  return result;
}

exports.getRefPointHiker = async (point_id, hiker_id, time) => {
  const sql = "SELECT * FROM HIKER_POINT WHERE point_id = ? AND hiker_id = ? AND time > ?"
  return await db.get(sql, [point_id, hiker_id, time]);
}