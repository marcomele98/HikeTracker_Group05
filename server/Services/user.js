"use strict"

const crypto = require('crypto');
const db = require('../Queries/user');

class User {

    constructor() { }

    async getUser(email, password) {

        // console.log(email)
        let user = await db.getUser(email);

        if (user) {
            let salt = user.salt;

            return new Promise((resolve, reject) => {
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);
                    const passwordHex = Buffer.from(user.password, 'hex');

                    if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
                        resolve(false); 
                    else resolve(user);
                });
            })
        }
        else return undefined
    }

    async getUserById(id) {
        return db.getUserById(id)
    }

}

module.exports = User;