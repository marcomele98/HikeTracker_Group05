"use strict";
// Class definition
class PointStruct {
    constructor(id=undefined,latitude, longitude, altitude,name,address, hike_id=undefined)
    {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.name = name;
        this.address = address;
        this.hike_id = hike_id;
    }
}


module.exports.PointStruct = PointStruct;