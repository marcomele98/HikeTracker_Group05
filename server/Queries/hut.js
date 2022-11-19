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