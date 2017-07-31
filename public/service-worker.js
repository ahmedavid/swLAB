self.addEventListener('install',function (event) {
    console.log("SW Installed...")
})

// self.addEventListener('fetch',function (event) {
//     console.log("INTERCEPTING")
//     event.waitUntil(
//         fetch(event.request)
//             .then(function (response) {
//                 console.log("DONE:",response)
//                 return response
//             })
//             .catch(function (err) {
//                 console.error(err)
//             })
//     )
// })

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('cachTEST').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});