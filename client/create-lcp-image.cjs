const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'produto-8.jpg'); // Source image
const outputPath = path.join(__dirname, 'public', 'hero-mobile-lcp.webp');

async function createLCPImage() {
    try {
        if (!fs.existsSync(inputPath)) {
            // Fallback to searching for png or webp if jpg doesn't exist
            console.log("jpg not found, looking for others...");
            // logic handled manually if fails, but let's try strict first
        }

        await sharp(inputPath)
            .resize({ width: 768 }) // Mobile width
            .webp({ quality: 60, effort: 6 }) // Aggressive compression for < 50KB
            .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        console.log(`Created ${outputPath}, size: ${(stats.size / 1024).toFixed(2)}KB`);

        if (stats.size > 50 * 1024) {
            console.log("Warning: Image is > 50KB, trying lower quality...");
            await sharp(inputPath)
                .resize({ width: 768 })
                .webp({ quality: 30, effort: 6 })
                .toFile(outputPath);
            const newStats = fs.statSync(outputPath);
            console.log(`Retry size: ${(newStats.size / 1024).toFixed(2)}KB`);
        }

    } catch (error) {
        console.error("Error creating LCP image:", error);
    }
}

createLCPImage();
