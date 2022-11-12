'use strict';

const db = require('./DAO');

const {HutStruct} = require("../Models/hut_model");


exports.getHuts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from HUT';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const huts = rows.map(row => new HutStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));
                resolve(huts);
            }
        });
    });
}

exports.getHutById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM HUT WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        } else if (row === undefined) {
          resolve(-1);
        } else {
          const Hut = row.map(row => new HutStruct(row.id,row.name,row.latitude,row.longitude,row.altitude));  
          resolve(Hut);
        }
      });
    });
  };