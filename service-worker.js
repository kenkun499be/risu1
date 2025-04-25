self.addEventListener('install', (event) => {
  self.skipWaiting();  // 新しいservice workerをすぐに適用
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());  // 新しいservice workerがすぐにアクティブになる
});
