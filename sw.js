const staticCache = "CurrencyConverter";

const cacheStaticAssets=[
	"./",
	"./index.html",
	"./css/style.css",
	"./js/main.js",
	"./manifest.json",
	"https://free.currencyconverterapi.com/api/v5/currencies"
];

self.addEventListener("install", (event) => {
  console.log("installing..."); //logging
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => cache.addAll(cacheStaticAssets))
  );
});

self.addEventListener("activate", (event) =>{
	console.log("activating...");
	event.waitUntil(
		caches.keys().then(cache =>{
			return Promise.all(
				cache.filter((cacheNames) =>{
					return cacheNames != cacheStaticAssets;
				}).map((cacheName)=> {
					return caches.delete(cacheName)
				})
			)
		})
	)
});

self.addEventListener("fetch",(event)=>{
		console.log("fecthing...");
	event.respondWith(
		caches.match(event.request).then(function(resp) {
		      return resp || fetch(event.request).then(function(response) {
		        let responseClone = response.clone();
		        caches.open(staticCache).then(function(cache) {
		          cache.put(event.request, responseClone);
		        });

		        return response;
		      });
	}))
})
