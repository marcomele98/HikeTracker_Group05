const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const app = require('../index');
const user = require('../testObjects/user')
const hikeObject = require('../testObjects/hike')
const pointObject = require('../testObjects/refPoints')

exports.agent = chai.request.agent(app);


exports.logout = async () => {
    await this.agent.delete('/api/sessions/current')
}

exports.loginLocalGuide = async () => {
    await this.agent.post('/api/sessions')
        .send(user.lg1Credentials)
        .then(function (res) {
            res.should.have.status(200);
        });
}

exports.loginHiker = async () => {
    await this.agent.post('/api/sessions')
        .send(user.h1Credentials)
        .then(function (res) {
            res.should.have.status(200);
        });
}

exports.postHike = async () => {
    await this.agent.post('/api/hike')
        .send(hikeObject.hike)
        .then(function (res) {
            res.should.have.status(201);
        });
}

exports.startHike = async () => {
    await this.agent.post('/api/startHike/' + 1)
        .send(hikeObject.hikeStartDates)
        .then(function (res) {
            res.should.have.status(201);
        });
}

exports.recordPoint = async () => {
    await this.agent.post('/api/newRefPointRecord')
        .send(pointObject.refPointRecord)
        .then(function (res) {
            res.should.have.status(201);
        })
}

