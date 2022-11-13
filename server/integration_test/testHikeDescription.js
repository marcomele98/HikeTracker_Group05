'user strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const app = require('../app');
var agent = chai.request.agent(app);
const { Service } = require('../Services/service');
const { assert } = require("chai");