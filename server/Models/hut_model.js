"use strict";
// Class definition
class HutStruct {
    constructor(id=undefined,name,latitude, longitude, altitude)
    {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}


module.exports.HutStruct = HutStruct;