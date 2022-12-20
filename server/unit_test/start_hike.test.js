const hike = require('../Queries/hike');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');

function HikesHiker(hike_id, hiker_id,start_time,end_time) {
    this.hike_id = hike_id;
    this.hiker_id = hiker_id;
    this.start_time = start_time;
    this.end_time = end_time;
}

describe("Start Hike tests", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
        await daoUtility.createGiulioLiso();
        await daoUtility.createLuigiVerdi();
        await daoUtility.createHikes();

    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });

    test('test startHikeByHiker', async () => {
        
        let hikeStarted1 = new HikesHiker(1,2,'2022-12-19 14:00:00',null);
        let hikeStarted2 = new HikesHiker(2,3,'2022-12-27 09:30:00',null);

        let data;

        data = await hike.getHikeByHiker(1,2);
        expect(data).toBe(undefined);

        data = await hike.getHikeByHiker(2,3);
        expect(data).toBe(undefined);

        await hike.startHikeByHiker(hikeStarted1.hike_id,hikeStarted1.hiker_id,hikeStarted1.start_time);
        data = await hike.getHikeByHiker(hikeStarted1.hike_id,hikeStarted1.hiker_id);
        expect(hikeStarted1).toEqual(data);

        await hike.startHikeByHiker(hikeStarted2.hike_id,hikeStarted2.hiker_id,hikeStarted2.start_time);
        data = await hike.getHikeByHiker(hikeStarted2.hike_id,hikeStarted2.hiker_id);
        expect(hikeStarted2).toEqual(data);
        
    });

    test('test endHikeByHiker', async () => {
        
        let hikeEnded1 = new HikesHiker(1,2,'2022-12-19 14:00:00','2022-12-19 18:00:00');
        let hikeEnded2 = new HikesHiker(2,3,'2022-12-27 09:30:00','2022-12-27 11:30:00');

        let data;

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