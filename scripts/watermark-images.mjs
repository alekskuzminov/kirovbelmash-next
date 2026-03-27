import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WATERMARK = path.join(ROOT, 'public/images/wotermark.png');
const OPACITY = 0.7;

const TARGET_DIRS = [
    path.join(ROOT, 'public/images/projects'),
    path.join(ROOT, 'public/images/equipment'),
    path.join(ROOT, 'public/images/lines'),
];

// Паттерны имён файлов, которые не нужно защищать
const EXCLUDE_PATTERNS = ['hero-bg', '-result.', 'recycling', 'raw-material'];

function shouldExclude(filePath) {
    const name = path.basename(filePath);
    return EXCLUDE_PATTERNS.some((p) => name.includes(p));
}

function collectImages(dir) {
    const results = [];
    if (!fs.existsSync(dir)) return results;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectImages(fullPath));
        } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

async function applyWatermark(imagePath) {
    const { width, height } = await sharp(imagePath).metadata();

    // Масштабируем водяной знак под размер изображения (object-contain: центр, прозрачные поля)
    const { data, info } = await sharp(WATERMARK)
        .resize(width, height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    // Уменьшаем прозрачность (каждый 4-й байт — альфа-канал)
    for (let i = 3; i < data.length; i += 4) {
        data[i] = Math.round(data[i] * OPACITY);
    }

    const watermarkBuffer = await sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();

    // Читаем файл в память (чтобы Sharp не держал хэндл файла)
    const inputBuffer = fs.readFileSync(imagePath);

    const outputBuffer = await sharp(inputBuffer)
        .composite([{ input: watermarkBuffer, blend: 'over' }])
        .toBuffer();

    fs.writeFileSync(imagePath, outputBuffer);
}

async function main() {
    const files = TARGET_DIRS.flatMap((dir) =>
        collectImages(dir).filter((f) => !shouldExclude(f))
    );

    console.log(`Найдено файлов: ${files.length}`);
    console.log('Начинаю обработку...\n');

    let processed = 0;
    let failed = 0;

    for (const file of files) {
        try {
            await applyWatermark(file);
            processed++;
            const rel = file.replace(ROOT, '').replace(/\\/g, '/');
            process.stdout.write(`[${processed}/${files.length}] ${rel}\n`);
        } catch (err) {
            failed++;
            console.error(`ОШИБКА: ${file}\n  ${err.message}`);
        }
    }

    console.log(`\nГотово. Обработано: ${processed}, ошибок: ${failed}`);
}

main().catch(console.error);
