'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/calabria/huts/"

module.exports = {
    ca_hut1_img: getBase64Image(path + 'IlBrigante.jpg'),
    ca_hut2_img: getBase64Image(path + 'VillaggioBaffa.jpg'),
}