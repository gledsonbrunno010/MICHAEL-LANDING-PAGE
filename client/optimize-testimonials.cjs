const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function optimizeTestimonials() {
    const images = Array.from({ length: 12 }, (_, i) => `testimonial-${i + 1}.png`);

    for (const file of images) {
        const inputPath = path.join(publicDir, file);
        if (fs.existsSync(inputPath)) {
            const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

            console.log(`Processing ${file}...`);

            try {
                await sharp(inputPath)
                    .resize({ width: 150, height: 150, fit: 'cover' }) // Optimization for avatar
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Saved ${outputPath}`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        } else {
            console.log(`File not found: ${file}`);
        }
    }
}

optimizeTestimonials();
