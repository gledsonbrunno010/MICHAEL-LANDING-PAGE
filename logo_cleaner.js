
import { Jimp } from 'jimp';

async function cleanLogo() {
    try {
        const inputPath = 'client/public/logo-original.png';
        const outputPath = 'client/public/logo-surgical.png';

        console.log(`Reading from ${inputPath}...`);
        const image = await Jimp.read(inputPath);

        console.log(`Processing ${image.width}x${image.height} image...`);

        image.scan(0, 0, image.width, image.height, (x, y, idx) => {
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            const a = image.bitmap.data[idx + 3];

            // Surgical Matte Removal logic
            // Target pure white and near-white halo pixels
            if (r > 230 && g > 230 && b > 230) {
                image.bitmap.data[idx + 3] = 0; // Set Alpha to 0
            }
        });

        await image.write(outputPath);
        console.log(`Surgical cleanup complete. Saved to ${outputPath}`);

    } catch (error) {
        console.error('Error processing image:', error);
        process.exit(1);
    }
}

cleanLogo();
