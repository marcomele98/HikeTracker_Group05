"use strict"

const crypto = require('crypto');
const db = require('../Queries/user');

class User {

    async getUser(email, password) {
        
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

    async registerUser(data) {
        let salt = crypto.randomBytes(16).toString("base64");
        let hashedPassword = crypto.scryptSync(data.password, salt, 32).toString("hex");

        return db.newUser(data.name, data.surname, data.role, hashedPassword, data.email, salt, data.phone_number);
    }

}

module.exports = User;