'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/liguria/hikes/"

module.exports = {
    li_h1_img: getBase64Image(path +'hike1.jpg'),
    li_h2_img: getBase64Image(path +'hike2.jpg'),
    li_h3_img: getBase64Image(path +'hike3.jpg'),
    li_h4_img: getBase64Image(path +'hike4.jpg'),
    li_h5_img: getBase64Image(path +'hike5.jpg'),
    li_h6_img: getBase64Image(path +'hike6.jpg'),
    li_h7_img: getBase64Image(path +'hike7.jpg'),
    li_h8_img: getBase64Image(path +'hike8.jpg'),
    li_h9_img: getBase64Image(path +'hike9.jpg'),
}