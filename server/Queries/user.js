'use strict';

const crypto = require('crypto');

const db = require('./DAO');


exports.getUserById = async (id) => {
    const sql = 'SELECT * FROM USER WHERE id = ?';
    return db.get(sql, [id]);
}


exports.getUser = async (email) => {
    const sql = 'SELECT * FROM USER WHERE email = ?';
    return db.get(sql, [email]);
}

