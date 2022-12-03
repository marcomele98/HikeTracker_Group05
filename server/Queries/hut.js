'use strict';

const db = require('./DAO');

exports.getHuts = () => {
  const sql = 'SELECT * from HUT';
  return db.all(sql, []);
}

exports.getHutById = (id) => {
  const sql = "SELECT * FROM HUT WHERE id=?";
  return db.get(sql, [id]);
};

exports.addHut = async (hut) => {
  const sql = 'INSERT INTO HUT(name,latitude, longitude, altitude,type, region, province, city, number_of_beds,phone, email, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let result = await db.insert(sql, [hut.name, hut.latitude, hut.longitude, hut.altitude, hut.type, hut.region, hut.province.toUpperCase(), hut.city, hut.number_of_beds,hut.phone, hut.email, hut.description]);
  return result;
}