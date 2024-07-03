document.addEventListener('DOMContentLoaded', function() {
    const allowedReferrers = [
        window.location.origin + '/index.html',
        window.location.origin + '/nested/moments.html'
    ];
    
    const referrer = document.referrer;
    console.log("Referrer: " + referrer); // Debugging: Überprüfen Sie den Referrer

    if (!allowedReferrers.includes(referrer)) {
        document.body.innerHTML = '';
        alert("Bitte rufe diese Seite nur über die Startseite oder die Moments-Seite auf. Hier ist ein Passwort notwendig.");
        window.location.href = '../index.html';
    }
});
