const hike = require('../Queries/hike');
const sqlite = require('sqlite3');

const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

db.run('DELETE FROM HIKE_HUT');
db.run("INSERT INTO HIKE_HUT (hike_id, hut_id)\
        VALUES(1, 1),\
        (2, 2)\
");

function HikesHuts (hike_id, hut_id) {
    this.hike_id = hike_id;
    this.hut_id = hut_id;
}

test('test getHikesHuts', async() => {
    let data = await hike.getHikesHuts();
    let hh1 = new HikesHuts(1,1);
    let hh2 = new HikesHuts(2,2);
    expect(data.length).toStrictEqual(2);
    let hh1_check = new HikesHuts(data[0].hike_id, data[0].hut_id);
    let hh2_check = new HikesHuts(data[1].hike_id, data[1].hut_id);
    expect(hh1_check).toEqual(hh1);
    expect(hh2_check).toEqual(hh2);
});

test('test getHikesHutsByHikeID', async() => {
    let data1 = await hike.getHikesHutsByHikeID(1);
    expect(data1.length).toStrictEqual(1);
    expect(data1[0].hut_id).toBe(1);

    let data2 = await hike.getHikesHutsByHikeID(2);
    expect(data2.length).toStrictEqual(1);
    expect(data2[0].hut_id).toBe(2);
});