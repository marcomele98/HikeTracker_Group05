const hike = require('../Queries/hike');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');



function HikesHuts(hike_id, hut_id) {
    this.hike_id = hike_id;
    this.hut_id = hut_id;
}




describe("hutsDao", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
        await db.run(
            "INSERT INTO HUT(id,name,latitude, longitude, altitude, type, region, province, city, number_of_beds, description)\
                 VALUES (1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, ''),\
                (2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, '')"
        );

        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
        VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 2, 'Parking point'),\
        (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'Parking point', 3, 'Parking point')"
        );

        await db.run("INSERT INTO HIKE_HUT (hike_id, hut_id)\
        VALUES(1, 1),\
        (2, 2)"
        );
    });

    afterAll(async () => {
        await daoUtility.resetDB();
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