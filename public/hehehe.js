document.documentElement.requestFullscreen()
    
if(ServiceWorker in navigator) {
    navigator.serviceWorker.register('sw.js');
}