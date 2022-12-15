'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/calabria/hikes/"

module.exports = {
    ca_h1_img: getBase64Image(path +'hike1.jpg'),
    ca_h2_img: getBase64Image(path +'hike2.jpg'),
    ca_h3_img: getBase64Image(path +'hike3.jpg'),
    ca_h4_img: getBase64Image(path +'hike4.jpg'),
    ca_h5_img: getBase64Image(path +'hike5.jpg'),
    ca_h6_img: getBase64Image(path +'hike6.jpg'),
    ca_h7_img: getBase64Image(path +'hike7.jpg'),
    ca_h8_img: getBase64Image(path +'hike8.jpg'),
}