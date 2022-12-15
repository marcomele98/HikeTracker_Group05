'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/veneto/huts/"

module.exports = {
    ve_hut1_img: getBase64Image(path +'marioVazzoler.jpg'),
    ve_hut2_img: getBase64Image(path + 'angelini.jpg'),
    ve_hut3_img: getBase64Image(path +'malga_pramper.jpg'),
    ve_hut4_img: getBase64Image(path +'sommariva.jpg'),
    ve_hut5_img: getBase64Image(path +'tome.jpg'),
    ve_hut6_img: getBase64Image(path +'carestiato.jpg'),
    ve_hut7_img: getBase64Image(path +'camp.jpg')
}