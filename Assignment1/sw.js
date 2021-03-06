var CACHESTATIC = 'staticv1';
var CACHEDYNAMIC = 'dynamic';
var STATICFILES = [
    '/',
    '/index.html',
    'index.html',
    '/index.js',
    '/offline.html',
    '/followers.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
];

self.addEventListener('install', function(event){
    console.log("Installed: ", event);
    event.waitUntil(
        caches.open(CACHESTATIC)
            .then(function(cache){
                console.log("CACHE STATIC");
                cache.addAll(STATICFILES);
            })
    )
});

self.addEventListener("activate", function(event){
    console.log("ACTIVATED", event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList){
                return Promise.all(keyList.map(function(key){
                if(key !== CACHESTATIC && key!== CACHEDYNAMIC){
                    console.log("[Service Worker]: Deleting Cache!", key);
                    return caches.delete(key);
                }
            }
            ))
            })
    )
})


self.addEventListener('fetch', function(event){
    var url = 'https://api.github.com/users/imrizwan/followers';
    if(event.request.url.indexOf(url) > -1){
        caches.open(CACHEDYNAMIC)
            .then(function(cache){
                return fetch(event.request)
                .then(function(res){
                    cache.put(event.request.url, res.clone());
                    return res;
                })
            })
    } else {
        event.respondWith(
            caches.match(event.request)
              .then(function(response) {
                if (response) {
                  return response;
                } else {
                  return fetch(event.request)
                    .then(function(res) {
                      return caches.open(CACHEDYNAMIC)
                        .then(function(cache) {
                          cache.put(event.request.url, res.clone());
                          return res;
                        })
                    })
                    .catch(function(err) {
                        return caches.open(CACHESTATIC).then(function(cache) {
                            console.log(CACHESTATIC);
                            if(event.request.headers.get('accept').includes('text/html')){
                                return cache.match('/offline.html');
                            }
                            });
                    });
                }
              })
          );
    }
})