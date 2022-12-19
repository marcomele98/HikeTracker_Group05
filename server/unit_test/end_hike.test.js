const hike = require('../Queries/hike');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');

function HikesHiker(hike_id, hiker_id,start_time,end_time) {
    this.hike_id = hike_id;
    this.hiker_id = hiker_id;
    this.start_time = start_time;
    this.end_time = end_time;
}

describe("Start and End Hike tests", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();

        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 2, 'Parking point'),\
            (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'Parking point', 3, 'Parking point')"
        );

        await db.run("INSERT INTO USER(id, name, surname, role, password, email, salt, phone_number)\
        VALUES (2, 'Luigi', 'Verdi', 'hiker', \
        '47b5880cd28fb469b027514f66ea88bb70cfdc09f74da5b57cf10a5e99f79987', \
        'lg2@p.it', '7753261635033673', '3334567981'),\
        (3, 'Giulia', 'Ferrari', 'hiker', \
        '2ae2aedbee5039df2dd9e543242630c0f0163be04743839005149d153d8c5ccf', \
        'lg3@p.it', '4882005695689689', '3334567982')"
        );

    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });

    test('test endHikeByHiker', async () => {
        
        let hikeEnded1 = new HikesHiker(1,2,'2022-12-19 14:00:00','2022-12-19 18:00:00');
        let hikeEnded2 = new HikesHiker(2,3,'2022-12-27 09:30:00','2022-12-27 11:30:00');

        let data;

        await hike.startHikeByHiker(hikeEnded1.hike_id,hikeEnded1.hiker_id,hikeEnded1.start_time);
        await hike.startHikeByHiker(hikeEnded2.hike_id,hikeEnded2.hiker_id,hikeEnded2.start_time);

        data = await hike.getHikeByHiker(1,2);
        expect(data.end_time).toBe(null);

        data = await hike.getHikeByHiker(2,3);
        expect(data.end_time).toBe(null);

        await hike.endHikeByHiker(hikeEnded1.hike_id,hikeEnded1.hiker_id,hikeEnded1.end_time);
        data = await hike.getHikeByHiker(hikeEnded1.hike_id,hikeEnded1.hiker_id);
        expect(hikeEnded1).toEqual(data);

        await hike.endHikeByHiker(hikeEnded2.hike_id,hikeEnded2.hiker_id,hikeEnded2.end_time);
        data = await hike.getHikeByHiker(hikeEnded2.hike_id,hikeEnded2.hiker_id);
        expect(hikeEnded2).toEqual(data);
        
    });
})