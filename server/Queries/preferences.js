'use strict';

const db = require('./DAO');

exports.getPreferencesByUserId = (id) => {
    const sql = "SELECT * from HIKER_PREFRENCES WHERE user_id = ?";
    return db.get(sql, [id]);
};
  