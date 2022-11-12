"use strict";
const { HutStruct} = require('./hut_model');
const { ParkingStruct} = require('./parking_model');
const { PointStruct} = require('./point_model');
// Class definition
class HikeStruct {
  constructor(id=undefined,title,length_kms,expected_mins,ascendent_meters,difficulty,region, city, lg_id=undefined, gpx,end_point,
              end_point_type, start_point, start_point_type)
    {
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

class HikeDetailStruct
{
    constructor(hike= new HikeStruct ,huts = [], parking_lots = [], points = []){
        this.hike=hike;
        this.huts=huts;
        this.parking_lots=parking_lots;
        this.points=points;
    }
    

}

class Hike_HutStruct {
    constructor(hike_id,hut_id)
    {
        this.hike_id = hike_id;
        this.hut_id = hut_id;
    }
}

class Hike_ParkingStruct {
    constructor(hike_id,parking_id)
    {
        this.hike_id = hike_id;
        this.parking_id = parking_id;
    }
}


module.exports.HikeStruct = HikeStruct;
module.exports.Hike_HutStruct = Hike_HutStruct;
module.exports.Hike_ParkingStruct = Hike_ParkingStruct;
module.exports.HikeDetailStruct = HikeDetailStruct;