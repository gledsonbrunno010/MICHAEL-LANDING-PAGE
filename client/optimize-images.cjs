const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
    const files = fs.readdirSync(publicDir);

    for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const inputPath = path.join(publicDir, file);
            const outputPath = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

            console.log(`Processing ${file}...`);

            try {
                let quality = 80;
                let data = await sharp(inputPath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality })
                    .toBuffer();

                while (data.length > 100 * 1024 && quality > 10) {
                    quality -= 5;
                    data = await sharp(inputPath)
                        .resize({ width: 1920, withoutEnlargement: true })
                        .webp({ quality })
                        .toBuffer();
                }

                fs.writeFileSync(outputPath, data);
                console.log(`Saved ${outputPath} (${(data.length / 1024).toFixed(2)} KB)`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages();
