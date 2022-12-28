'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/lombardia/hikes/"

module.exports = {
    lo_h1_img: getBase64Image(path +'hike1.jpg'),
    lo_h2_img: getBase64Image(path +'hike2.jpg'),
    lo_h3_img: getBase64Image(path +'hike3.jpg'),
    lo_h4_img: getBase64Image(path +'hike4.jpg'),
    lo_h5_img: getBase64Image(path +'hike5.jpg'),
    lo_h6_img: getBase64Image(path +'hike6.jpg'),
    lo_h7_img: getBase64Image(path +'hike7.jpg'),
    lo_h8_img: getBase64Image(path +'hike8.jpg'),
}