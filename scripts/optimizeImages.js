const fs = require('fs');
const path = require('path');
const { convertToWebP } = require('../src/utils/imageOptimizer');

async function optimizeImages(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively optimize images in subdirectories
      await optimizeImages(filePath);
    } else if (stat.isFile()) {
      // Process image files
      const extension = path.extname(file).toLowerCase();
      if (extension === '.jpg' || extension === '.jpeg' || extension === '.png') {
        const outputPath = path.join(dirPath, `${path.basename(file, extension)}.webp`);
        await convertToWebP(filePath, outputPath);
      }
    }
  }
}

const imagesPath = path.join(process.cwd(), 'public/articleImages'); // Path to your images folder

optimizeImages(imagesPath).catch(console.error);