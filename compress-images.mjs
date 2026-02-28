/**
 * compress-images.mjs
 * Compresses heavy hero background images using sharp
 * Uses copyFile (not rename/unlink) to handle Windows file locks
 */
import sharp from 'sharp';
import { stat, copyFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TARGET_IMAGES = [
    'public/images/lines/briquetting/briquett-line-hero-bg.webp',
    'public/images/lines/drying/drying-lines-hero-bg.webp',
    'public/images/lines/granulation/pellets-lines-hero-bg.webp',
    'public/images/home/hero-bg.webp',
    'public/images/home/why-bg.webp',
    'public/images/about/about-hero-bg.webp',
    'public/images/about/about-mission-bg.webp',
    'public/images/about/about-certificates-bg.webp',
    'public/images/blog/blog-hero-bg.webp',
    'public/images/calculator/calculator-hero-bg.webp',
    'public/images/services/services-hero-bg.webp',
    'public/images/projects/projects-hero-bg.webp',
];

async function getFileSizeKB(filePath) {
    try {
        return Math.round((await stat(filePath)).size / 1024);
    } catch {
        return null;
    }
}

async function compress(relPath) {
    const absPath = path.join(__dirname, relPath);
    const tmpPath = absPath + '.__tmp__.webp';
    const beforeKB = await getFileSizeKB(absPath);

    if (beforeKB === null) {
        console.log(`  ⚠️  SKIP (not found): ${path.basename(relPath)}`);
        return;
    }

    try {
        const meta = await sharp(absPath).metadata();

        // Step 1: compress to temp file
        await sharp(absPath)
            .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
            .webp({ quality: 78 })
            .toFile(tmpPath);

        // Step 2: read temp file into buffer
        const buffer = (await import('fs')).default.readFileSync(tmpPath);

        // Step 3: overwrite original by writing buffer directly (no unlink/rename)
        await writeFile(absPath, buffer);

        // Step 4: clean up temp
        try { (await import('fs')).default.unlinkSync(tmpPath); } catch { }

        const afterKB = await getFileSizeKB(absPath);
        const saved = beforeKB - afterKB;
        const ratio = Math.round((saved / beforeKB) * 100);
        console.log(`  ✅ ${path.basename(relPath)}: ${beforeKB} KB → ${afterKB} KB (−${saved} KB, −${ratio}%)`);
    } catch (err) {
        try { (await import('fs')).default.unlinkSync(tmpPath); } catch { }
        console.log(`  ❌ ERROR ${path.basename(relPath)}: ${err.message}`);
    }
}

async function main() {
    console.log('\n🗜️  Compressing hero background images...\n');
    for (const img of TARGET_IMAGES) {
        await compress(img);
    }
    console.log('\n✅ Done! Now commit and push the compressed images.');
}

main();
