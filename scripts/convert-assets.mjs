import fs from 'node:fs';
import path from 'node:path';
import convert from 'heic-convert';

const inputDir = path.resolve('assets');
const outputDir = path.resolve('public/products');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'));
console.log(`Found ${files.length} HEIC files to convert.`);

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  // Clean name
  let cleanName = file
    .replace(/^dippers_/i, '')
    .replace(/\.heic$/i, '')
    .replace(/ñ/g, 'n')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  const outputPath = path.join(outputDir, `${cleanName}.jpg`);
  console.log(`Converting ${file} -> ${cleanName}.jpg ...`);

  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85,
    });
    fs.writeFileSync(outputPath, outputBuffer);
    console.log(`  Saved ${outputPath} (${outputBuffer.length} bytes)`);
  } catch (err) {
    console.error(`  Error converting ${file}:`, err);
  }
}

console.log('Conversion complete!');
