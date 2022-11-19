'use strict';

const sqlite = require('sqlite3');
const db = require('./DAO');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});



exports.getHuts = () => {
        const sql = 'SELECT * from HUT';
        return db.all(sql, []);
}

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM HUT WHERE id=?";
      db1.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          resolve(row);
        }
      });
    });
  };

  exports.addHut = async (hut) => {
    const sql = 'INSERT INTO HUT(name,latitude, longitude, altitude,type, region, province, city, number_of_beds, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let result = await db.insert(sql, [hut.name, hut.latitude, hut.longitude, hut.altitude, hut.type, hut.region, hut.province.toUpperCase(), hut.city, hut.number_of_beds, hut.description]);
    return result;
}