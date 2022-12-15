'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/veneto/hikes/"

module.exports = {
    ve_h1_img: getBase64Image(path +'hike1.jpg'),
    ve_h2_img: getBase64Image(path + 'hike2.jpg'),
    ve_h3_img: getBase64Image(path +'hike3.jpg'),
    ve_h4_img: getBase64Image(path +'hike4.jpg'),
    ve_h5_img: getBase64Image(path +'hike5.jpg'),
    ve_h6_img: getBase64Image(path +'hike6.jpg'),
    ve_h7_img: getBase64Image(path +'hike7.jpg'),
    ve_h8_img: getBase64Image(path +'hike8.jpg'),
}