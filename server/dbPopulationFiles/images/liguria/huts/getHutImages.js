'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/liguria/huts/"

module.exports = {
    li_hut1_img: getBase64Image(path + 'Molini.jpg'),
}