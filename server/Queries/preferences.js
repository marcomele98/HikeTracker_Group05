'use strict';

const db = require('./DAO');

exports.getPreferencesByUserId = (id) => {
    const sql = "SELECT * from HIKER_PREFERENCES WHERE user_id = ?";
    return db.get(sql, [id]);
};

exports.addPreferences = async (preference,id) => {

    const sql = 'INSERT INTO HIKER_PREFRENCES(user_id, max_length_kms, min_length_kms, max_expected_mins, min_expected_mins,\
         max_ascendent_meters, min_ascendent_meters, max_difficulty, min_difficulty, point_latitude, point_longitude, radius,\
         region, province, city) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    let result = await db.insert(sql, [id, preference.max_length_kms, preference.min_length_kms, preference.max_expected_mins,
        preference.min_expected_mins, preference.max_ascendent_meters, preference.min_ascendent_meters, preference.max_difficulty,
        preference.min_difficulty, preference.point_latitude, preference.point_longitude, preference.radius, preference.region,
        preference.province.toUpperCase(), preference.city]);

    return result;
};

exports.deletePreferences = async (id) => {

    const sql = "DELETE FROM HIKER_PREFRENCES WHERE user_id = ?"

    return await db.run(sql, [id]);
};


