'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/valledaosta/hikes/"

module.exports = {
    va_h1_img: getBase64Image(path +'hike1.jpg'),
    va_h2_img: getBase64Image(path +'hike2.jpg'),
    va_h3_img: getBase64Image(path +'hike3.jpg'),
    va_h4_img: getBase64Image(path +'hike4.jpg'),
    va_h5_img: getBase64Image(path +'hike5.jpg'),
    va_h6_img: getBase64Image(path +'hike6.jpg'),
    va_h7_img: getBase64Image(path +'hike7.jpg'),
    va_h8_img: getBase64Image(path +'hike8.jpg'),
}