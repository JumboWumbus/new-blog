const sharp = require('sharp');

async function convertToWebP(inputPath, outputPath) {
  await sharp(inputPath)
    .webp({ quality: 75 }) // You can adjust the quality as needed
    .toFile(outputPath);
}

module.exports = {
  convertToWebP,
};
