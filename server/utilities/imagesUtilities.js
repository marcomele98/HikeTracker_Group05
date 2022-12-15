const fs = require('fs');

function getBase64Image(imagePath) {
    const image = "data:image/jpg;base64," + fs.readFileSync(imagePath, "base64");
    return image;
  }

module.exports.getBase64Image = getBase64Image