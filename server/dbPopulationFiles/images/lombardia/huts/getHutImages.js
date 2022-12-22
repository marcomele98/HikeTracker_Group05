'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/lombardia/huts/"

module.exports = {
    lo_hut1_img: getBase64Image(path + 'Pineta.jpg'),
    lo_hut2_img: getBase64Image(path + 'Grassi.jpg'),
    lo_hut3_img: getBase64Image(path + 'Casa Alpina Pio X.jpg'),
    lo_hut4_img: getBase64Image(path + 'Baita Partrizi.jpg'),
    lo_hut5_img: getBase64Image(path + 'La Cascata.jpg'),
}