'use strict';

const db = require('./DAO');


exports.getUserById = async (id) => {
    const sql = 'SELECT * FROM USER WHERE id = ?';
    return db.get(sql, [id]);
}


exports.getUser = async (email) => {
    const sql = 'SELECT * FROM USER WHERE email = ?';
    return db.get(sql, [email]);
}

exports.newUser = async(name, surname, role, password, email, salt, phone_number) => {
    const sql = 'INSERT INTO USER(name, surname, role, password, email, salt, phone_number)\
                        VALUES (?, ?, ?, ?, ?, ?, ?)';
    return db.run(sql, [name, surname, role, password, email, salt, phone_number]);
}

