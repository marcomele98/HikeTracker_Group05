'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/piemonte/hikes/"

module.exports = {
    pm_h1_img: getBase64Image(path +'hike1.jpg'),
    pm_h2_img: getBase64Image(path +'hike2.jpg'),
    pm_h3_img: getBase64Image(path +'hike3.jpg'),
    pm_h4_img: getBase64Image(path +'hike4.jpg'),
    pm_h5_img: getBase64Image(path +'hike5.jpg'),
}