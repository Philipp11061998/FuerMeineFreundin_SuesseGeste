document.addEventListener('DOMContentLoaded', function() {
    const allowedReferrers = [
        window.location.origin + '/index.html',
        window.location.origin + '/nested/moments.html'
    ];
    
    const referrer = document.referrer;
    if (!allowedReferrers.includes(referrer)) {
        document.body.innerHTML = '';
        alert("Bitte rufe diese Seite nur über die Startseite oder die Moments Seite auf. Hier ist ein Passwort notwendig")
        window.location.href = '../index.html';
        
        // Option 2: Display an alert and stop loading the page
        // alert('Access denied. You can only access this page from Moments or Home.');
        // document.body.innerHTML = ''; // Clears the page content
        
        // Option 3: Redirect back to the index
        // window.location.href = '../index.html';
    }
});