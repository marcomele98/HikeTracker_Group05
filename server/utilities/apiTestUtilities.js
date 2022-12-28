const chaiUtility = require('../utilities/chaiUtilities');
const daoUtility = require('../utilities/daoUtilities')

exports.reset = async() => {
    await chaiUtility.logout();
    await daoUtility.resetDB();
}

exports.setup = async() => {
    await this.reset();
    await daoUtility.createMarioRossi();
    await chaiUtility.loginLocalGuide();
}

exports.setupPreferences = async() => {
    await this.reset();
    await daoUtility.createMarioRossi();
    await daoUtility.createLuigiVerdi();
    await daoUtility.createGiulioLiso();
    await daoUtility.savePreferencesForLuigiVerdi();
    await daoUtility.savePreferencesForGiulioLiso();
    await chaiUtility.loginHiker();
}

exports.loginHiker = async() => {
    await this.setup();
    await chaiUtility.postHike();
    await chaiUtility.postHike();
    await daoUtility.createLuigiVerdi();
    await chaiUtility.logout();
    await chaiUtility.loginHiker();
}

exports.loginHikerAndStartHike = async() => {
    await this.loginHiker()
    await chaiUtility.startHike();
    await chaiUtility.recordPoint();
}
