const db = require('../Queries/DAO')

exports.resetDB = async ()=> {
    await db.run('DELETE FROM HIKE_PARKING');
    await db.run('DELETE FROM HIKE_HUT');
    await db.run('DELETE FROM HIKE');
    await db.run('DELETE FROM HUT');
    await db.run('DELETE FROM PARKING_LOT');
    await db.run('DELETE FROM POINT');
    await db.run('DELETE FROM USER');
    await db.run('DELETE FROM sqlite_sequence');
}

exports.createMarioRossi = async () => {
    await db.run(
        "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
           VALUES ('Mario', 'Rossi', 'local guide', \
                  'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                  'lg1@p.it', '4783473632662333', '3334567980')"
    );
}