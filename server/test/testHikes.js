const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = require('../index');
var agent = chai.request.agent(app);
const db = require('../Queries/DAO');

const userCredentials = {
    username: "lg1@p.it",
    password: "password"
}


describe('test hikes apis', () => {
    beforeEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Mario', 'Rossi', 'local guide', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'lg1@p.it', '4783473632662333', '3334567980')"
        );
        await login()
    });

    afterEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
    });


    let hike = {
        "title": "ROCCIAMELONE",
        "length_kms": 9,
        "expected_mins": 420,
        "ascendent_meters": 3538,
        "difficulty": "Professional Hiker",
        "region": "Piemonte",
        "province": "TO",
        "city": "Mompantero",
        "gpx": "gpx content",
        "description": "a beautiful hike",
        "end_point": {
            "latitude": "45.20353",
            "longitude": "7.07734",
            "altitude": "3500.161133",
            "name": "prova",
            "address": "prova"
        },
        "start_point": {
            "latitude": "45.17778",
            "longitude": "7.08337",
            "altitude": "2147.107666",
            "name": "prova",
            "address": "prova"
        },
        "reference_points": [{
            "latitude": "45.189032",
            "longitude": "7.076255",
            "altitude": "2693.187012",
            "name": "prova",
            "address": "prova"
        },
        {
            "latitude": "45.184339",
            "longitude": "7.078848",
            "altitude": "2386.516113",
            "name": "prova",
            "address": "prova"
        }]
    }

    let hike_wrong = {
        "title": "ROCCIAMELONE",
        "length_kms": 9,
        "expected_mins": 420,
        "ascendent_meters": 3538,
        "difficulty": "Professional Hiker",
        "region": "Piemonte",
        "province": "TO",
        "city": "Mompantero",
        "gpx": "gpx content",
        "description": "a beautiful hike",
        "end_point": {
            "latitude": "ciao",
            "longitude": "7.07734",
            "altitude": "3500.161133",
            "name": "prova",
            "address": "prova"
        },
        "start_point": {
            "latitude": "45.17778",
            "longitude": "7.08337",
            "altitude": "2147.107666",
            "name": "prova",
            "address": "prova"
        },
        "reference_points": [{
            "latitude": "45.189032",
            "longitude": "7.076255",
            "altitude": "2693.187012",
            "name": "prova",
            "address": "prova"
        },
        {
            "latitude": "45.184339",
            "longitude": "7.078848",
            "altitude": "2386.516113",
            "name": "prova",
            "address": "prova"
        }]
    }

    let hike_wrong_2 = {
        "title": "ROCCIAMELONE",
        "length_kms": 9,
        "expected_mins": "ciao",
        "ascendent_meters": 3538,
        "difficulty": "Professional Hiker",
        "region": "Piemonte",
        "province": "TO",
        "city": "Mompantero",
        "gpx": "gpx content",
        "description": "a beautiful hike",
        "end_point": {
            "latitude": "45.20353",
            "longitude": "7.07734",
            "altitude": "3500.161133",
            "name": "prova",
            "address": "prova"
        },
        "start_point": {
            "latitude": "45.17778",
            "longitude": "7.08337",
            "altitude": "2147.107666",
            "name": "prova",
            "address": "prova"
        },
        "reference_points": [{
            "latitude": "45.189032",
            "longitude": "7.076255",
            "altitude": "2693.187012",
            "name": "prova",
            "address": "prova"
        },
        {
            "latitude": "45.184339",
            "longitude": "7.078848",
            "altitude": "2386.516113",
            "name": "prova",
            "address": "prova"
        }]
    }

    let hut = {
        'name': 'Refuge La Riposa',
        "latitude": "45.20353",
        "longitude": "7.07734",
        "altitude": "3500.161133",
        'type': 'Refuge',
        'region': 'Piemonte',
        'province': 'TO',
        'city': 'Mompantero',
        'number_of_beds': 20,
        'description': 'prova1'
    }

    let park = {
        "name": "parking di Valdinferno",
        "latitude": "45.20353",
        "longitude": "7.07734",
        "altitude": "3500.161133",
        "region": "Piemonte",
        "province": "TO",
        "city": "Mompantero"
    }

    let hut1 = {
        'name': 'Refuge La Riposa',
        'latitude': '45.17778',
        'longitude': '7.08337',
        'altitude': '2185',
        'type': 'Refuge',
        'region': 'Piemonte',
        'province': 'TO',
        'city': 'Mompantero',
        'number_of_beds': 20,
        'description': 'prova1'
    }

    let park1 = {
        "name": "parking di Valdinferno",
        "latitude": "45.17778",
        "longitude": "7.08337",
        "altitude": "1192",
        "region": "Piemonte",
        "province": "TO",
        "city": "Mompantero"
    }

    let updateEnd = {
        'end_point' : 1 ,
        'type_end' : 'Hut point'
    }

    let updateEnd1 = {
        'end_point' : 1 ,
        'type_end' : 'Parking point'
    }

    let updateStart = {
        'start_point' : 1 ,
        'type_start' : 'Hut point'
    }

    let updateStart1 = {
        'start_point' : 1 ,
        'type_start' : 'Parking point'
    }

    getHikes(hike);
    getHikeById(0, hike);
    getHikeById(1, hike);
    getHikeById(2, hike);
    getHikeById(10, hike);
    newHikeDescription(201, hike);
    newHikeDescription(422, hike_wrong);
    newHikeDescription(422, hike_wrong_2);
    updateEndPoint(200,1,hike, updateEnd, updateEnd1 , hut , park);
    updateStartPoint(200,1,hike,updateStart, updateStart1 , hut1 , park1);

})



function getHikes(hike) {
    it('Getting all hikes', function (done) {
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    agent.post('/api/hike')
                        .send(hike)
                        .then(function (res1) {
                            res1.should.have.status(201);
                            if (res1.status == 201) {
                                agent.get('/api/hikes')
                                    .then(function (res2) {
                                        res2.should.have.status(200);
                                        res2.body.should.have.length(2);
                                        done();
                                    });
                            }
                        })
                }
            });
    });
};

function getHikeById(id, hike) {
    it('Get hike specified by id', function (done) {
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    agent.post('/api/hike')
                        .send(hike)
                        .then(function (res1) {
                            res1.should.have.status(201);
                            if (res1.status == 201) {
                                agent.get('/api/hike/' + id)
                                    .then(function (res2) {
                                        if (id > 0 && id <= 2) {
                                            res2.should.have.status(200);
                                            res2.body.id.should.equal(id);
                                            done();
                                        } else {
                                            res2.should.have.status(404);
                                            done();
                                        }
                                    });
                            }
                        })
                }
            })
    });
};

function newHikeDescription(expectedHTTPStatus, hike) {
    it('adding a new hike description', function (done) {
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done()
            });
    });
}

function updateEndPoint(expectedHTTPStatus,id,hike,updateEnd, updateEnd1 , hut , park) {
    it('editing a hike End point', function (done) {
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    agent.post('/api/hike')
                        .send(hike)
                        .then(function (res5){
                            res5.should.have.status(201);
                            if (res5.status == 201) {
                                agent.post('/api/hut')
                                .send(hut)
                                .then(function (res1) {
                                res1.should.have.status(201);
                                if (res1.status == 201) {
                                    agent.put('/api/hikeEnd/' + id)
                                        .send(updateEnd)
                                        .then(function (res2) {
                                            if (id > 0 && id <= 2) {
                                                res2.should.have.status(200);
                                                if(res2.status == 200){
                                                    agent.post('/api/parkingLot')
                                                        .send(park)
                                                        .then(function (res3) {
                                                            res3.should.have.status(201);
                                                             if (res3.status == 201) {
                                                                agent.put('/api/hikeEnd/' + id)
                                                                    .send(updateEnd1)
                                                                    .then(function (res4) {
                                                                        if (id == 1) {
                                                                        res4.should.have.status(expectedHTTPStatus);
                                                                        done();
                                                                        }
                                                                        else {
                                                                        res2.should.have.status(404);
                                                                        done();
                                                                        }
                                                                    })
                                                                }
                                                                else {
                                                                    res2.should.have.status(404);
                                                                    done();
                                                                }
                                                        })

                                                }
                                                else {
                                                    res2.should.have.status(404);
                                                    done();
                                                }
                                        }
                                    });
                            }
                        })
                }
            })
        }
    });
})
}


function updateStartPoint(expectedHTTPStatus,id,hike,updateStart, updateStart1 , hut1 , park1) {
    it('editing a hike Start point', function (done) {
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    agent.post('/api/hike')
                        .send(hike)
                        .then(function (res5){
                            res5.should.have.status(201);
                            if (res5.status == 201) {
                                agent.post('/api/hut')
                                .send(hut1)
                                .then(function (res1) {
                                res1.should.have.status(201);
                                if (res1.status == 201) {
                                    agent.put('/api/hikeStart/' + id)
                                        .send(updateStart)
                                        .then(function (res2) {
                                            if (id > 0 && id <= 2) {
                                                res2.should.have.status(200);
                                                if(res2.status == 200){
                                                    agent.post('/api/parkingLot')
                                                        .send(park1)
                                                        .then(function (res3) {
                                                            res3.should.have.status(201);
                                                             if (res3.status == 201) {
                                                                agent.put('/api/hikeStart/' + id)
                                                                    .send(updateStart1)
                                                                    .then(function (res4) {
                                                                        if (id == 1) {
                                                                        res4.should.have.status(expectedHTTPStatus);
                                                                        done();
                                                                        }
                                                                        else {
                                                                        res2.should.have.status(404);
                                                                        done();
                                                                        }
                                                                    })
                                                                }
                                                                else {
                                                                    res2.should.have.status(404);
                                                                    done();
                                                                }
                                                        })

                                                }
                                                else {
                                                    res2.should.have.status(404);
                                                    done();
                                                }
                                        }
                                    });
                            }
                        })
                }
            })
        }
    });
})
}



async function logout() {
    await agent.delete('/api/sessions/current')
}

async function login() {
    await agent.post('/api/sessions')
        .send(userCredentials)
        .then(function (res) {
            res.should.have.status(200);
        });
}
