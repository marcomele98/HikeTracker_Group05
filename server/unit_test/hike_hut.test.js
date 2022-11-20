const hike = require('../Queries/hike');
const db = require('../Queries/DAO');




function HikesHuts(hike_id, hut_id) {
    this.hike_id = hike_id;
    this.hut_id = hut_id;
}




describe("hutsDao", () => {
    beforeAll(async () => {
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Mario', 'Rossi', 'local guide', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'lg1@p.it', '4783473632662333', '3334567980')"
        );

        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'point', 2, 'parking_lot'),\
            (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'parking_lot', 3, 'parking_lot')"
        );
        await db.run(
            "INSERT INTO HUT(id,name,latitude, longitude, altitude, type, region, province, city, number_of_beds, description)\
                 VALUES (1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, ''),\
                (2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, '')"
        );

        await db.run("INSERT INTO HIKE_HUT (hike_id, hut_id)\
        VALUES(1, 1),\
        (2, 2)"
        );
    });

    afterAll(async () => {
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');

    });

    test('test getHikesHuts', async () => {
        let data = await hike.getHikesHuts();
        let hh1 = new HikesHuts(1, 1);
        let hh2 = new HikesHuts(2, 2);
        expect(data.length).toStrictEqual(2);
        let hh1_check = new HikesHuts(data[0].hike_id, data[0].hut_id);
        let hh2_check = new HikesHuts(data[1].hike_id, data[1].hut_id);
        expect(hh1_check).toEqual(hh1);
        expect(hh2_check).toEqual(hh2);
    });

    test('test getHikesHutsByHikeID', async () => {
        let data1 = await hike.getHikesHutsByHikeID(1);
        expect(data1.length).toStrictEqual(1);
        expect(data1[0].hut_id).toBe(1);

        let data2 = await hike.getHikesHutsByHikeID(2);
        expect(data2.length).toStrictEqual(1);
        expect(data2[0].hut_id).toBe(2);
    });


})