//document.documentElement.requestFullscreen()

// TODO: Make it change favicon on tab switch
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User switched to a different tab or minimized the window');
    } else {
        console.log('User is back on this tab');
    }
});
