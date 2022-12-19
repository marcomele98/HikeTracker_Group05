'use strict';

const { getBase64Image } = require('../../../../utilities/imagesUtilities');

const path = "dbPopulationFiles/images/trentino/huts/"

module.exports = {
    tn_hut1_img: getBase64Image(path +'Nino_Pernici.jpg'),
    tn_hut2_img: getBase64Image(path + 'Capanna_Grassi.jpg'),
    tn_hut3_img: getBase64Image(path +'GanischgerAlm.jpg'),
    tn_hut4_img: getBase64Image(path +'obere_kugelalm.jpg'),
    tn_hut5_img: getBase64Image(path +'Capanna.jpg'),
    tn_hut6_img: getBase64Image(path +'BOCCA_DI_TRAT.jpg'),
    tn_hut7_img: getBase64Image(path +'Valmaggiore.jpg'),
    tn_hut8_img: getBase64Image(path +'Ponale_Alto_Belvedere.jpg')
}