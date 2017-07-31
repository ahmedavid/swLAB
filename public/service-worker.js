self.addEventListener('install',function (event) {
    console.log("SW Installed...")
})

// self.addEventListener('fetch',function (event) {
//     console.log("INTERCEPTING")
//     var url  = event.request.url.replace(/^https:\/\//i, 'http://');
//     console.log('URL:',url)
//     event.waitUntil(
//         fetch(url)
//             .then(function (response) {
//                 console.log("DONE SW:",response)
//                 return response
//             })
//             .catch(function (err) {
//                 console.error('ERROR IN FETCH',err)
//             })
//     )
// })

self.addEventListener('fetch', function(event) {
    console.log('INTERCEPTING')
    event.respondWith(
        caches.open('cachTEST').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                //event.request = event.request.replace(/^https:\/\//i, 'http://');
                console.log('URL:',event.request)
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});