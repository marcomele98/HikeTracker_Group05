'use strict';

const hike = require('../Queries/hike');

const sqlite = require('sqlite3');
const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

db.run('DELETE FROM HIKE');
db.run('DELETE FROM SQLITE_SEQUENCE');

class Hike {
    constructor(id,title,length_kms,expected_mins,ascendent_meters,difficulty,region,
    city,lg_id,gpx,end_point,end_point_type,start_point,start_point_type) {
                    
    this.id = id;
    this.title = title;
    this.length_kms = length_kms;
    this.expected_mins = expected_mins;
    this.ascendent_meters = ascendent_meters;
    this.difficulty = difficulty;
    this.region = region;
    this.city = city;
    this.lg_id = lg_id;
    this.gpx = gpx;
    this.end_point = end_point;
    this.end_point_type = end_point_type;
    this.start_point = start_point;
    this.start_point_type = start_point_type;
    }
}

class HikeInput {
    
    constructor(title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, gpx){

    this.title = title;
    this.length_kms = length_kms;
    this.expected_mins = expected_mins;
    this.ascendent_meters = ascendent_meters;
    this.difficulty = difficulty;
    this.region = region;
    this.city = city;
    this.gpx = gpx;
    }
}

test('Test newHike', async()=>{

    let lg_id = 1;
    let hikeIdToCheck;
    let hikeToCheck;

    const hike1 = new Hike(1,"prova1",10,120,980,"Hiker","TO","Bardonecchia",lg_id,"gpx_content",null,null,null,null);
    const hikeInput1 = new HikeInput(hike1.title,hike1.length_kms,hike1.expected_mins,hike1.ascendent_meters,hike1.difficulty,hike1.region,hike1.city,hike1.gpx);
    
    hikeIdToCheck = await hike.newHike(hikeInput1,lg_id);
    hikeToCheck = await hike.getHikeById(hikeIdToCheck);
    expect(hikeToCheck).toEqual(hike1);

    const hike2 = new Hike(2,"prova2",20,140,1000,"Professional Hiker","TO","La Touile",lg_id,"gpx_content",null,null,null,null);
    const hikeInput2 = new HikeInput(hike2.title,hike2.length_kms,hike2.expected_mins,hike2.ascendent_meters,hike2.difficulty,hike2.region,hike2.city,hike2.gpx);

    hikeIdToCheck = await hike.newHike(hikeInput2,lg_id);
    hikeToCheck = await hike.getHikeById(hikeIdToCheck);
    expect(hikeToCheck).toEqual(hike2);

});

test('Test updateHike', async()=>{

    

});