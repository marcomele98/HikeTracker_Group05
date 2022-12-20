const db = require('../Queries/DAO')

exports.resetDB = async ()=> {
    await db.run('DELETE FROM HIKE_PARKING');
    await db.run('DELETE FROM HIKE_HUT');
    await db.run('DELETE FROM HIKE');
    await db.run('DELETE FROM HUT');
    await db.run('DELETE FROM PARKING_LOT');
    await db.run('DELETE FROM POINT');
    await db.run('DELETE FROM HIKER_PREFERENCES');
    await db.run('DELETE FROM USER');
    await db.run('DELETE FROM sqlite_sequence');
    await db.run('DELETE FROM HIKE_HIKER');
}

exports.createMarioRossi = async () => {
    await db.run(
        "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
           VALUES ('Mario', 'Rossi', 'local guide', \
                  'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                  'lg1@p.it', '4783473632662333', '3334567980')"
    );
};

exports.createLuigiVerdi = async () => {
    await db.run(
        "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
            VALUES('Luigi', 'Verdi', 'hiker', \
                    '47b5880cd28fb469b027514f66ea88bb70cfdc09f74da5b57cf10a5e99f79987', \
                    'h1@p.it', '7753261635033673', '3334567981')"
    );
}

exports.createGiulioLiso = async() => {
    await db.run(
        "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
            VALUES('Giulio', 'Liso', 'hiker', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'h2@p.it', '4783473632662333', '3334567980')"
    );
}

exports.savePreferencesForLuigiVerdi = async () => {
    await db.run(
        "INSERT OR IGNORE INTO HIKER_PREFERENCES(user_id, max_length_kms, min_length_kms, max_expected_mins, min_expected_mins,\
            max_ascendent_meters, min_ascendent_meters, max_difficulty, min_difficulty, point_latitude, point_longitude, radius,\
            region, province, city)\
            VALUES(2, 200, 110, 200, 100, 120, 100, 'Hiker','Hiker',  '44.21736', '7.94432',10, 'Piemonte', 'CN', 'Garessio')"
    );
}

exports.savePreferencesForGiulioLiso = async () => {
    await db.run(
        "INSERT OR IGNORE INTO HIKER_PREFERENCES(user_id, max_length_kms, min_length_kms, max_expected_mins, min_expected_mins,\
            max_ascendent_meters, min_ascendent_meters, max_difficulty, min_difficulty, point_latitude, point_longitude, radius,\
            region, province, city)\
            VALUES(3, 110, 60, 120, 40, 200, 100, 'Hiker','Tourist', '44.19940', '7.93339', 50, 'Piemonte', 'CN', 'Garessio')"
    );
}

exports.createHikes = async() => {
    await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 2, 'Parking point'),\
            (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'Parking point', 3, 'Parking point')"
    );
}