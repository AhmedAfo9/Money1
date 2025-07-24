const CACHE_NAME = 'currency-converter-v1';
// قائمة الملفات والموارد التي سيتم تخزينها للعمل بدون انترنت
const assetsToCache = [
    './',
    './index.html',
    './icons/icon-192.png',
    './icons/icon-512.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&family=Playfair+Display:wght@700&display=swap'
];

// حدث التثبيت: يتم حفظ الملفات هنا
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(assetsToCache);
      })
  );
  self.skipWaiting();
});

// حدث الجلب: يتم تقديم الملفات من الذاكرة المؤقتة إذا كان المستخدم غير متصل بالإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، قم بإرجاعه، وإلا قم بجلبه من الشبكة
        return response || fetch(event.request);
      })
  );
});

// حدث التفعيل: يتم حذف الكاش القديم
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});