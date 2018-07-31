var STATIC_CACHE = 'static-v15';
var DYNAMIC_CACHE = 'dynamic-v11';

self.addEventListener('install', function(event){
    console.log("Installed", event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function(cache){
                console.log("[Service Worker]: PreCaching");
                cache.addAll([
                     '/',
                    '/index.html',
                    '/style.css',
                    '/index.js',
                    '/offline.html'
                  ]);
            }));
        });

self.addEventListener('activate', function(event){
    console.log("Activated");
    event.waitUntil(
        caches.keys()
            .then(function(keyList){
                return Promise.all(keyList.map(function(key){
                    if(key!==STATIC_CACHE && key!==DYNAMIC_CACHE){
                        console.log("Deleting Cache: ", key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

// self.addEventListener('fetch', function(event){

//    event.respondWith(
//        caches.match(event.request)
//         .then(function(response){
//             if(response){
//                 return response;
//             } else {
//                 // Dynamic Caching
//                 return fetch(event.request)
//                     .then(function(res){
//                         return caches.open(DYNAMIC_CACHE).
//                             then(function(cache){
//                                 cache.put(event.request.url, res.clone());
//                                 return res;
//                             }).catch(function(err){
//                                 return caches.open(STATIC_CACHE).then(function(cache) {
//                                     console.log(STATIC_CACHE);
//                                     return cache.match('/offline.html');
//                                  });
//                             });
//                     });
//             }
//         })
//    );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open(DYNAMIC_CACHE)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function(err) {
                return caches.open(STATIC_CACHE).then(function(cache) {
                    console.log(STATIC_CACHE);
                        return cache.match('/offline.html');
                });
              });
          }
        })
    );
  });