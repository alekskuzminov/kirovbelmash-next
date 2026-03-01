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

// Директория с локальными изображениями
const LOCAL_IMG_DIR = path.join(__dirname, 'public', 'images');

// Инициализация S3 клиента
const s3Client = new S3Client({
    region: S3_REGION || 'ru-1',
    endpoint: S3_ENDPOINT,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true
});

// Рекурсивный поиск всех файлов в директории
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

// Загрузка файла в S3
async function uploadFileToS3(filePath) {
    // Получаем путь относительно папки images
    const relativePath = path.relative(LOCAL_IMG_DIR, filePath).replace(/\\/g, '/');
    const fileKey = relativePath;

    // В AWS SDK v3 лучше читать весь файл в Buffer, а не через Stream, 
    // чтобы Payload Hash считался правильно (решает ContentSHA256Mismatch)
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    const uploadParams = {
        Bucket: S3_BUCKET,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable'
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`✅ [Успех] Загружено: ${fileKey} (${contentType})`);
        return true;
    } catch (err) {
        console.error(`❌ [Ошибка] Загрузка ${fileKey} не удалась. Причина: ${err.message || err.Code}`);
        return false;
    }
}

// Основная функция запуска
async function syncImagesToS3() {
    console.log(`Начинаем синхронизацию папки ${LOCAL_IMG_DIR} -> S3 Бакета ${S3_BUCKET}...`);

    if (!fs.existsSync(LOCAL_IMG_DIR)) {
        console.error('Ошибка: Папка public/images не найдена!');
        return;
    }

    const files = getAllFiles(LOCAL_IMG_DIR);
    console.log(`Найдено файлов для загрузки: ${files.length}\n`);

    let successCount = 0;
    // Ограничим параллельность через батчи
    for (const file of files) {
        const success = await uploadFileToS3(file);
        if (success) successCount++;
    }

    console.log(`\n🎉 Синхронизация завершена! Успешно файлов: ${successCount} из ${files.length}`);
}

syncImagesToS3();
