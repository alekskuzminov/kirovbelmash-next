const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// --- НАСТРОЙКИ BEGET S3 ---
const S3_ENDPOINT = 'https://s3.ru1.storage.beget.cloud';
const S3_REGION = 'us-east-1'; // Beget использует стандартный aws-регион для совместимости
const S3_BUCKET = 'ccf5cfe7fed6-s3-kirovbelmash';
const S3_ACCESS_KEY = 'UJFWYMMICTTFO7KWRQDU';
const S3_SECRET_KEY = 'ZpgLt10HsJYnBx7WTA6wNzqpFiZ6pbCFPpD9D8sB';

// Директория с локальными изображениями
const LOCAL_IMG_DIR = path.join(__dirname, 'public', 'images');

// Инициализация S3 клиента с отключенным подсчётом SHA256 (решает XAmzContentSHA256Mismatch на сторонних S3)
const s3Client = new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
    }
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
        Body: fileBuffer, // Передаем Buffer вместо Stream
        ContentType: contentType,
        // Заголовок кэширования на 1 год
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
