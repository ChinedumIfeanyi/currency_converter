
if (navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js')
    .then((registration) =>{
        console.log('serviceworker registered',);
    }).catch((err) => {
        console.log('service worker not registered', err)
    })
}
