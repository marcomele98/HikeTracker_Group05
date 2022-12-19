const hikeObject = require('../testObjects/hike')
const hutObject = require('../testObjects/hut')
const parkObject = require('../testObjects/parks')
const pointObject = require('../testObjects/refPoints')

const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');



describe('test hikes apis', () => {
    beforeEach(async () => {
        await testUtility.setup();
    });

    afterEach(async () => {
        await testUtility.reset();
    });

    getHikes(hikeObject.hike);
    getHikeById(0, hikeObject.hike);
    getHikeById(1, hikeObject.hike);
    getHikeById(2, hikeObject.hike);
    getHikeById(10, hikeObject.hike);
    newHikeDescription(201, hikeObject.hike);
    newHikeDescription(422, hikeObject.hike_wrong);
    newHikeDescription(422, hikeObject.hike_wrong_2);
    updateEndPoint(200,1,hikeObject.hike, hikeObject.updateEnd, hikeObject.updateEnd1 , hutObject.hut , parkObject.park);
    updateStartPoint(200,1,hikeObject.hike,hikeObject.updateStart, hikeObject.updateStart1 , hutObject.hut1 , parkObject.park1);
    updateStartPoint(422,1,hikeObject.hike,hikeObject.updateStart, undefined , hutObject.hut1 , parkObject.park1);
    newRefrencePoint(201,1,hikeObject.hike,pointObject.point1);
    newRefrencePoint(201,1,hikeObject.hike,pointObject.point2);
    newRefrencePoint(422,1,hikeObject.hike,pointObject.wrongPoint1);
    hikeHutLink(201,1,hikeObject.hike,hutObject.hut);
    hikeHutLink(201,1,hikeObject.hike,hutObject.hut2);
    hikeHutLink(404,123,hikeObject.hike,hutObject.hut3);
});

describe('test hikes apis no login', () => {
    beforeEach(async () => {
        await testUtility.reset();
    });

    afterEach(async () => {
        await testUtility.reset();
    });

    newHikeDescription(401, hikeObject.hike);
});

describe('test hikes apis as hiker', () => {
    beforeEach(async () => {
        await testUtility.loginHiker();
    });

    afterEach(async () => {
        await testUtility.reset();
    });

    getHikes(hikeObject.hike, 'hiker', 1, hikeObject.hikeStartDates, hikeObject.hikeEndDates);
    startHikeByHiker(1, hikeObject.hikeStartDates);
    endHikeByHiker(1, hikeObject.hikeStartDates, hikeObject.hikeEndDates);
    endHikeByHiker(1, hikeObject.hikeStartDates, hikeObject.hikeEndDates_wrong);
});



function getHikes(hike, role, id, startDate_time, endDate_time) {
    it('Getting all hikes', function (done) {
        if(role !== 'hiker'){
            chaiUtility.agent.post('/api/hike')
                .send(hike)
                .then(function (res) {
                    res.should.have.status(201);
                    if (res.status == 201) {
                        chaiUtility.agent.post('/api/hike')
                            .send(hike)
                            .then(function (res1) {
                                res1.should.have.status(201);
                                if (res1.status == 201) {
                                    chaiUtility.agent.get('/api/hikes')
                                        .then(function (res2) {
                                            res2.should.have.status(200);
                                            res2.body.should.have.length(2);
                                            done();
                                        });  
                                }
                            })
                    }
                });
        }
        else{
            chaiUtility.agent.post('/api/startHike/'+ id)
                .send(startDate_time)
                .then(function (res3) {
                    res3.should.have.status(201);
                    if (res3.status === 201) {
                        chaiUtility.agent.put('/api/endHike/'+ id)
                            .send(endDate_time)
                            .then(function (res4){
                                if (res4.status === 200){
                                    chaiUtility.agent.get('/api/hikes')
                                        .then(function (res5) {
                                            res5.should.have.status(200);
                                            res5.body.should.have.length(2);
                                            res5.body[0].start_time.should.equal(startDate_time.date_time);
                                            done();
                                        }); 
                                }
                            });
                    }
                });
        }
    });
};

function getHikeById(id, hike) {
    it('Get hike specified by id', function (done) {
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    chaiUtility.agent.post('/api/hike')
                        .send(hike)
                        .then(function (res1) {
                            res1.should.have.status(201);
                            if (res1.status == 201) {
                                chaiUtility.agent.get('/api/hike/' + id)
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

function startHikeByHiker(hikeId, startDate_time){
    it('start a hike', function (done) {
        chaiUtility.agent.post('/api/startHike/'+ hikeId)
        .send(startDate_time)
        .then(function (res) {
            res.should.have.status(201);
            if (res.status === 201) {
                chaiUtility.agent.get('/api/hike/' + hikeId)
                    .then(function (res1) {
                        res1.should.have.status(200);
                        res1.body.id.should.equal(hikeId);
                        res1.body.start_time.should.equal(startDate_time.date_time);
                        done();
                    });
                }
            });

    });
}

function endHikeByHiker(hikeId, startDate_time, endDate_time){
    it('end a hike', function (done) {
        chaiUtility.agent.post('/api/startHike/'+ hikeId)
        .send(startDate_time)
        .then(function (res) {
            res.should.have.status(201);
            if (res.status === 201) {
                chaiUtility.agent.put('/api/endHike/'+ hikeId)
                    .send(endDate_time)
                    .then(function (res2) {
                        if (res2.status === 200) {
                            chaiUtility.agent.get('/api/hike/' + hikeId)
                            .then(function (res1) {
                                res1.should.have.status(200);
                                res1.body.id.should.equal(hikeId);
                                res1.body.end_time.should.equal(endDate_time.date_time);
                                done();
                            });
                        }
                        else{
                            res2.should.have.status(422);
                            done();
                        }
                    });
            }
        });

    });
}

function newHikeDescription(expectedHTTPStatus, hike) {
    it('adding a new hike description', function (done) {
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done()
            });
    });
}

function updateEndPoint(expectedHTTPStatus,id,hike,updateEnd, updateEnd1 , hut , park) {
    it('editing a hike End point', function (done) {
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    chaiUtility.agent.post('/api/hike')
                        .send(hike)
                        .then(function (res5){
                            res5.should.have.status(201);
                            if (res5.status == 201) {
                                chaiUtility.agent.post('/api/hut')
                                .send(hut)
                                .then(function (res1) {
                                res1.should.have.status(201);
                                if (res1.status == 201) {
                                    chaiUtility.agent.put('/api/hikeEnd/' + id)
                                        .send(updateEnd)
                                        .then(function (res2) {
                                            if (id > 0 && id <= 2) {
                                                res2.should.have.status(200);
                                                if(res2.status == 200){
                                                    chaiUtility.agent.post('/api/parkingLot')
                                                        .send(park)
                                                        .then(function (res3) {
                                                            res3.should.have.status(201);
                                                             if (res3.status == 201) {
                                                                chaiUtility.agent.put('/api/hikeEnd/' + id)
                                                                    .send(updateEnd1)
                                                                    .then(function (res4) {
                                                                        console.log(updateEnd1);
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
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    chaiUtility.agent.post('/api/hike')
                        .send(hike)
                        .then(function (res5){
                            res5.should.have.status(201);
                            if (res5.status == 201) {
                                chaiUtility.agent.post('/api/hut')
                                .send(hut1)
                                .then(function (res1) {
                                res1.should.have.status(201);
                                if (res1.status == 201) {
                                    chaiUtility.agent.put('/api/hikeStart/' + id)
                                        .send(updateStart)
                                        .then(function (res2) {
                                            if (id > 0 && id <= 2) {
                                                res2.should.have.status(200);
                                                if(res2.status == 200){
                                                    chaiUtility.agent.post('/api/parkingLot')
                                                        .send(park1)
                                                        .then(function (res3) {
                                                            res3.should.have.status(201);
                                                             if (res3.status == 201) {
                                                                chaiUtility.agent.put('/api/hikeStart/' + id)
                                                                    .send(updateStart1)
                                                                    .then(function (res4) {
                                                                        console.log(updateStart1);
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

function newRefrencePoint(expectedHTTPStatus,id,hike,point) {
    it('add a new refrence point', function (done) {
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    chaiUtility.agent.post('/api/hike')
                        .send(hike)
                        .then(function (res5){
                            res5.should.have.status(201);
                            if (res5.status == 201) {
                                chaiUtility.agent.post('/api/newRefPoint/'+ id)
                                .send(point)
                                .then(function (res1) {
                                    if (id > 0 && id <= 2) {
                                        res1.should.have.status(expectedHTTPStatus);
                                        done();
                                    }
                                    else {
                                        res1.should.have.status(404);
                                        done();
                                    }
                                 
                                })
                            }
                        })
                }
            });
    })
}

function hikeHutLink(expectedHTTPStatus,id,hike,hut){
    it('link an hut to a reference point', function (done) {
        chaiUtility.agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(201);
                if (res.status == 201) {
                    chaiUtility.agent.post('/api/hut')
                        .send(hut)
                        .then(function (res1){
                            res1.should.have.status(201);
                            if (res1.status == 201) {
                                chaiUtility.agent.post('/api/newRefPoint/'+ id)
                                .send(hut)
                                .then(function (res2) {
                                    if (id == 1) {
                                        console.log("prova");
                                        res2.should.have.status(expectedHTTPStatus);
                                        done();
                                    }
                                    else {
                                        res2.should.have.status(404);
                                        done();
                                    }
                                 
                                })
                            }
                        })
                }
            })
    })
}