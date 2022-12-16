'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/valledaosta/huts/"

module.exports = {
    va_hut1_img: getBase64Image(path +'barmasse.jpg'),
    va_hut2_img: getBase64Image(path +'duca-degli-abruzzi.jpg'),
    va_hut3_img: getBase64Image(path +'barbustel.jpg')
}