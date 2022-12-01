const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const app = require('../index');
const user = require('../testObjects/user')

exports.agent = chai.request.agent(app);


exports.logout = async () => {
    await this.agent.delete('/api/sessions/current')
}

exports.login = async () => {
    await this.agent.post('/api/sessions')
        .send(user.lg1Credentials)
        .then(function (res) {
            res.should.have.status(200);
        });
}
