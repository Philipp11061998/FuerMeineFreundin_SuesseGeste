if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registriert mit dem Scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
}

$(document).ready(function() {


});