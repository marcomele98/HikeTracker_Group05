'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/trentino/hikes/"

module.exports = {
    tn_h1_img: getBase64Image(path +'hike1.jpg'),
    tn_h2_img: getBase64Image(path +'hike2.jpg'),
    tn_h3_img: getBase64Image(path +'hike3.jpg'),
    tn_h4_img: getBase64Image(path +'hike4.jpg'),
    tn_h5_img: getBase64Image(path +'hike5.jpg'),
    tn_h6_img: getBase64Image(path +'hike6.jpg'),
    tn_h7_img: getBase64Image(path +'hike7.jpg'),
    tn_h8_img: getBase64Image(path +'hike8.jpg'),
}