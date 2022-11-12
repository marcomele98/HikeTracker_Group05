"use strict";
// Class definition
class ParkingStruct {
    constructor(id=undefined,name,latitude, longitude, altitude)
    {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}


module.exports.ParkingStruct = ParkingStruct;