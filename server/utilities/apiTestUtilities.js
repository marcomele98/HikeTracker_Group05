const chaiUtility = require('../utilities/chaiUtilities');
const daoUtility = require('../utilities/daoUtilities')

exports.reset = async() => {
    await chaiUtility.logout();
    await daoUtility.resetDB();
}

exports.setup = async() => {
    await this.reset();
    await daoUtility.createMarioRossi();
    await chaiUtility.login();
}