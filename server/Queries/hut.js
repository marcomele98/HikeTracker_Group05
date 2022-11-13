'use strict';

const sqlite = require('sqlite3');
const db1 = new sqlite.Database('HT.sqlite', err => { if (err) throw err;});
const {HutStruct} = require("../Models/hut_model");


exports.getHuts = () => {
    //return new Promise((resolve, reject) => {
        const sql = 'SELECT * from HUT';
        return db.all(sql, []);
        /*db1.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const huts = rows.map(row => new HutStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));
                resolve(huts);
            }
        });*/
   // });
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
          const Hut = new HutStruct(row.id,row.name,row.latitude,row.longitude,row.altitude);  
          resolve(Hut);
        }
      });
    });
  };