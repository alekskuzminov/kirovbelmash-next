export default function s3Loader({ src, width, quality }) {
    const cdnHost = 'https://cdn.kirovbelmash.ru';

    // Если путь начинается с /images/ (как это прописано везде в коде)
    if (src.startsWith('/images/')) {
        // В S3 картинки лежат в корне (без папки /images/), т.к. мы синхронизировали содержимое public/images
        // Поэтому вырезаем '/images/' из начала пути
        const s3Path = src.replace(/^\/images\//, '');
        return `${cdnHost}/${s3Path}?w=${width}&q=${quality || 75}`;
    }

    return src;
}
