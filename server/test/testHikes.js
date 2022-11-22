const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = require('../index');
var agent = chai.request.agent(app);
const db = require('../Queries/DAO');


describe('test hikes apis', () => {
    beforeEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Mario', 'Rossi', 'local guide', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'lg1@p.it', '4783473632662333', '3334567980')"
          );
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Giulio', 'Liso', 'hiker', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'h1@p.it', '4783473632662333', '3334567980')"
        );

        await db.run("INSERT INTO PARKING_LOT(name, latitude, longitude, altitude, region, province, city)\
                    VALUES('Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio'),\
                    ('Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio'),\
                    ('Parking Colletta di Castelbianco','44.11318','8.06597','235','Liguria', 'SV', 'Castelbianco')"
        );

        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type, description)\
                VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 2, 'Parking point', ''),\
                (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'Parking point', 3, 'Parking point', '')\
        ");

        await db.run("INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id)\
                     VALUES('34.34635', '9.14343', '431', 'Punto di ritrovo', 'Via Roma, 16', 1)"
        );

    });

    afterEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM sqlite_sequence');
    });

    let user = {
        "username": "lg1@p.it",
        "password": "password"
    }

    let hike =  {
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
        "end_point" : {
                        "latitude" : "45.20353",
                        "longitude" : "7.07734",
                        "altitude" : "3500.161133",
                        "name" : "prova",
                        "address" : "prova"
                    },
        "start_point" : {
                        "latitude" : "45.17778",
                        "longitude" : "7.08337",
                        "altitude" : "2147.107666",
                        "name" : "prova", 
                        "address" : "prova" 
        },
        "reference_points" : [{
                        "latitude" : "45.189032",
                        "longitude" : "7.076255",
                        "altitude" : "2693.187012",
                        "name" : "prova",
                        "address" : "prova" 
                    }, 
                    {
                        "latitude" : "45.184339",
                        "longitude" : "7.078848",
                        "altitude" : "2386.516113",
                        "name" : "prova",
                        "address" : "prova"
                    }]
    }  

    let hike_wrong =  {
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
        "end_point" : {
                        "latitude" : "ciao",
                        "longitude" : "7.07734",
                        "altitude" : "3500.161133",
                        "name" : "prova",
                        "address" : "prova"
                    },
        "start_point" : {
                        "latitude" : "45.17778",
                        "longitude" : "7.08337",
                        "altitude" : "2147.107666",
                        "name" : "prova", 
                        "address" : "prova" 
        },
        "reference_points" : [{
                        "latitude" : "45.189032",
                        "longitude" : "7.076255",
                        "altitude" : "2693.187012",
                        "name" : "prova",
                        "address" : "prova" 
                    }, 
                    {
                        "latitude" : "45.184339",
                        "longitude" : "7.078848",
                        "altitude" : "2386.516113",
                        "name" : "prova",
                        "address" : "prova"
                    }]
    }  

    let hike_wrong_2 =  {
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
        "end_point" : {
                        "latitude" : "45.20353",
                        "longitude" : "7.07734",
                        "altitude" : "3500.161133",
                        "name" : "prova",
                        "address" : "prova"
                    },
        "start_point" : {
                        "latitude" : "45.17778",
                        "longitude" : "7.08337",
                        "altitude" : "2147.107666",
                        "name" : "prova", 
                        "address" : "prova" 
        },
        "reference_points" : [{
                        "latitude" : "45.189032",
                        "longitude" : "7.076255",
                        "altitude" : "2693.187012",
                        "name" : "prova",
                        "address" : "prova" 
                    }, 
                    {
                        "latitude" : "45.184339",
                        "longitude" : "7.078848",
                        "altitude" : "2386.516113",
                        "name" : "prova",
                        "address" : "prova"
                    }]
    }  
    
    getHikes();
    getHikeById(0);
    getHikeById(1);
    getHikeById(2);
    getHikeById(10);
    newHikeDescription(201, hike, user);
    newHikeDescription(422, hike_wrong, user);
    newHikeDescription(422, hike_wrong_2, user);
    newHikeDescription(401, hike)
    
})



function getHikes () {
    it('Getting all hikes', function() {
        return agent.get('/api/hikes')
        .then(function (res) {
            res.should.have.status(200);
            res.body.should.have.length(2);
        });
    });
};

function getHikeById (id) {
    it('Get hike specified by id', function () {
        return agent.get('/api/hike/' + id)
        .then(function (res) {
            if(id > 0 && id <= 2) {
                res.should.have.status(200);
                res.body.id.should.equal(id);
            } else {
                res.should.have.status(404);
            }
        });
    });
};

function newHikeDescription(expectedHTTPStatus, hike, user) {
    it('adding a new hike description', async function () {
        await login(user)
        return agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


async function logout() {
    await agent.delete('/api/sessions/current')
}


async function login(user) {
    await agent.post('/api/sessions')
    .send(user)
}