$projects = @(
    "2014/2014-01-granulation-kirov",
    "2015/2015-09-briquetting-ossetia",
    "2016/2016-01-briquetting-perm",
    "2016/2016-08-briquetting-saratov",
    "2016/2016-08-granulation-saratov",
    "2016/2016-11-briquetting-saratov",
    "2017/2017-11-granulation-komi",
    "2017/2017-12-granulation-kirov",
    "2018/2018-05-drying-kirov",
    "2018/2018-06-granulation-kirov",
    "2019/2019-07-briquetting-kirov",
    "2019/2019-09-drying-vologda",
    "2020/2020-03-granulation-kirov",
    "2020/2020-09-briquetting-mari-el",
    "2022/2022-08-drying-komi",
    "2022/2022-12-briquetting-udmurtia",
    "2022/2022-12-combined-khmao",
    "2023/2023-06-briquetting-kirov",
    "2023/2023-12-granulation-vologda",
    "2024/2024-04-drying-komi",
    "2025/2025-06-briquetting-perm",
    "2025/2025-07-drying-vologda",
    "2025/2025-08-briquetting-vologda"
)

$basePath = "c:\Users\User\Desktop\kirovbelmash-next\public\images\projects"

foreach ($p in $projects) {
    $dir = Join-Path $basePath $p
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $detailsFile = Join-Path $dir "details.md"
    New-Item -ItemType File -Path $detailsFile -Force | Out-Null
    Write-Host "Created: $detailsFile"
}
