/**
 * compress-images.cjs
 * CJS format — sharp works reliably via require()
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;

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

function getFileSizeKB(filePath) {
    try {
        return Math.round(fs.statSync(filePath).size / 1024);
    } catch {
        return null;
    }
}

async function compress(relPath) {
    const absPath = path.join(PROJECT_ROOT, relPath);
    const tmpPath = absPath + '._tmp_.webp';
    const beforeKB = getFileSizeKB(absPath);

    if (beforeKB === null) {
        console.log(`  ⚠️  SKIP (not found): ${path.basename(relPath)}`);
        return;
    }

    try {
        const meta = await sharp(absPath).metadata();

        // Compress to temp file
        await sharp(absPath)
            .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
            .webp({ quality: 78 })
            .toFile(tmpPath);

        // Read compressed buffer
        const buf = fs.readFileSync(tmpPath);

        // Overwrite original
        fs.writeFileSync(absPath, buf);

        // Remove temp
        try { fs.unlinkSync(tmpPath); } catch { }

        const afterKB = getFileSizeKB(absPath);
        const saved = beforeKB - afterKB;
        const ratio = Math.round((saved / beforeKB) * 100);
        console.log(`  ✅ ${path.basename(relPath)}: ${beforeKB} KB → ${afterKB} KB (−${saved} KB, −${ratio}%)`);
    } catch (err) {
        try { fs.unlinkSync(tmpPath); } catch { }
        console.log(`  ❌ ERROR ${path.basename(relPath)}: ${err.message}`);
    }
}

async function main() {
    console.log('\n🗜️  Compressing hero background images...\n');
    for (const img of TARGET_IMAGES) {
        await compress(img);
    }
    console.log('\n✅ Done! Commit and push the compressed images.');
}

main();
