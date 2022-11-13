const hike = require('../Queries/hike');
const sqlite = require('sqlite3');

const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

db.run('DELETE FROM HIKE_PARKING');
db.run("INSERT INTO HIKE_PARKING (hike_id, parking_id)\
        VALUES(1, 1),\
        (2, 2)\
");

function HikesParkings (hike_id, parking_id) {
    this.hike_id = hike_id;
    this.parking_id = parking_id;
}

test('test getHikesParkings', async() => {
    let data = await hike.getHikesParkings();
    let hh1 = new HikesParkings(1,1);
    let hh2 = new HikesParkings(2,2);
    expect(data.length).toStrictEqual(2);
    let hh1_check = new HikesParkings(data[0].hike_id, data[0].parking_id);
    let hh2_check = new HikesParkings(data[1].hike_id, data[1].parking_id);
    expect(hh1_check).toEqual(hh1);
    expect(hh2_check).toEqual(hh2);
});


test('test getHikesParkingsByHikeID', async() => {
    let data1 = await hike.getHikesParkingsByHikeID(1);
    expect(data1.length).toStrictEqual(1);
    expect(data1[0].parking_id).toBe(1);

    let data2 = await hike.getHikesParkingsByHikeID(2);
    expect(data2.length).toStrictEqual(1);
    expect(data2[0].parking_id).toBe(2);
});
