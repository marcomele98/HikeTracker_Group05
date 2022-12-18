'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/piemonte/huts/"

module.exports = {
    pm_hut1_img: getBase64Image(path + "La-Riposa.jpg"),
    pm_hut2_img: getBase64Image(path + "Ca'-d'Asti.jpg"),
    pm_hut3_img: getBase64Image(path + "Savona.jpg"),
    pm_hut4_img: getBase64Image(path + "gallo-di-monte.jpg"),
}