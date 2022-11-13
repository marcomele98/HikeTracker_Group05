const chai = require("chai");
const chaiHttp = require("chai-http");
const { INTERNAL } = require("sqlite3");
chai.use(chaiHttp);
chai.should();

const app = require('../index');
var agent = chai.request.agent(app);

const sqlite = require('sqlite3');

const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

describe('test hikes apis', () => {
    beforeEach(() => {
        db.run('DELETE FROM HIKE');
        /*db.run('DELETE FROM HIKE_HUT');
        db.run('DELETE FROM HIKE_PARKING');
        db.run('DELETE FROM POINT');*/

        db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
                VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'point', 2, 'parking_lot'),\
                (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'CN', 'Garessio', 1, 'gpx_content', 1, 'parking_lot', 3, 'parking_lot')\
        ");

        /*db.run("INSERT INTO HIKE_HUT(hike_id, hut_id)\
                VALUES(1, 1),\
                (2, 2)\
        ");

        db.run("INSERT INTO HIKE_PARKING(hike_id, parking_id)\
                VALUES(1, 1),\
                (2, 2)\
        ");

        db.run("INSERT INTO POINT(id, latitude, longitude, altitude, name, address, hike_id )\
                VALUES (1, '45.20353', '7.07734', '3538', 'Rocciamelone','Rocciamelone, Piedmont', 1),\
               (2, '44.20647', '7.92800', '5300', 'La pianura dalle Alpi Liguri','Garessio, Cuneo, Piedmont', 2 ),\
        ")*/
    });
    getHikes();
    getHikeById(0);
    getHikeById(1);
    getHikeById(2);
    getHikeById(10);
    newHikeDescription();
})



function getHikes () {
    it('Getting all hikes', function(done) {
        agent.get('/api/hikes')
        .then(function (res) {
            res.should.have.status(200);
            res.body.should.have.length(2);
            done();
        });
    });
};

function getHikeById (id) {
    it('Get hike specified by id', function (done) {
        agent.get('/api/hike/' + id)
        .then(function (res) {
            if(id > 0 && id <= 2) {
                res.should.have.status(200);
                res.body.id.should.equal(id);
                //res.body.huts.should.have.length(1);
                //res.body.parking_lots.should.have.length(1);
                //res.body.points.should.have.length(1);
            } else {
                res.should.have.status(404);
            }          
            done();
        });
    });
};

function newHikeDescription(expectedHTTPStatus, title,length_km,expected_mins, ascendent_meters, difficulty, region,city,gpx,end_point,start_point,reference_points) {
    it('adding a new hike description', async function () {
        let hike = { title: title, length_km: length_km, expected_mins: expected_mins, ascendent_meters:ascendent_meters,difficulty: difficulty, region:region,
            city:city,gpx: gpx,end_point:end_point,start_point:start_point,reference_points:reference_points,}
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                
            });
    });
}

