// Service Worker للاستقبال الفوري للإشعارات الخارجية
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'familyapp';
  const options = {
    body: data.body || 'لديك رسالة عائلية جديدة!',
    icon: '/icon.png',
    badge: '/icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
