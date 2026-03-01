const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const dotenv = require('dotenv');

// Загружаем настройки из .env.local
dotenv.config({ path: '.env.local' });

const {
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT,
    S3_REGION,
    S3_BUCKET
} = process.env;

if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    console.error('❌ Ошибка: В .env.local отсутствуют ключи доступа S3_ACCESS_KEY_ID или S3_SECRET_ACCESS_KEY');
    process.exit(1);
}

const s3Client = new S3Client({
    region: S3_REGION || 'ru-1',
    endpoint: S3_ENDPOINT,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true
});

// Рекурсивный поиск всех MP4 файлов
function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else if (name.endsWith('.mp4')) {
            files_.push(name);
        }
    }
    return files_;
}

async function uploadVideos() {
    const imagesDir = path.join(__dirname, 'public', 'images');
    const videos = getFiles(imagesDir);

    console.log(`🚀 Найдено видео для загрузки: ${videos.length}`);

    for (const videoPath of videos) {
        // Получаем путь относительно папки images, например: projects/2025/project-name/video.mp4
        const relativePath = path.relative(imagesDir, videoPath).replace(/\\/g, '/');
        const fileKey = relativePath;
        const fileBuffer = fs.readFileSync(videoPath);

        console.log(`📤 Загрузка: ${fileKey}...`);

        try {
            await s3Client.send(new PutObjectCommand({
                Bucket: S3_BUCKET,
                Key: fileKey,
                Body: fileBuffer,
                ContentType: 'video/mp4',
                CacheControl: 'public, max-age=31536000, immutable'
            }));
            console.log(`✅ Успешно: ${fileKey}`);
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${fileKey}:`, error);
        }
    }

    console.log('\n✨ Загрузка всех видео завершена!');
}

uploadVideos();
