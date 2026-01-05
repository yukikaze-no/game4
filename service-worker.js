// キャッシュ名（適当にバージョンをつける）
const CACHE_NAME = 'rhythm-game-cache-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
  // 必要ならここに音源や画像ファイルも追加
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// 古いキャッシュの削除（将来の更新用）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// オフライン時はキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // キャッシュがあればそれを返す
      if (response) {
        return response;
      }
      // なければ普通にネットワークへ
      return fetch(event.request);
    })
  );
});