$(document).ready(function() {
    
    $("#hamburgLabel").click(function() {
        $(this).toggleClass('clicked');
        $("#nav").toggle(); // Toggle visibility of the navigation menu
    });

    $("#ausklappen").click(function() {
            $("#NavigationMoments").toggle();
            let visNavMom = $("#NavigationMoments").css("display");

            if (visNavMom !== "none") {
                $("#ausklappen").html("Tage einklappen <span class='arrow'>&#x2191</span>");
            } else {
                $("#ausklappen").html("Tage ausklappen <span class='arrow'>&#x2193</span>");
            }
    });

    $("#NavigationMoments").click(function(){
        $("#NavigationMoments").toggle();
            let visNavMom = $("#NavigationMoments").css("display");

            if (visNavMom !== "none") {
                $("#ausklappen").html("Tage einklappen <span class='arrow'>&#x2191</span>");
            } else {
                $("#ausklappen").html("Tage ausklappen <span class='arrow'>&#x2193</span>");
            }
    });

    $('#chat').click(function(event) {
        event.preventDefault();
        // Zeigen des Passwortfeldes
        $("#ChatPassword").css("display", "flex");
    
        $('#submitpassword').click(function(event) {
            event.preventDefault();

            const Referrer = window.location.origin + './nested/moments.html';
            
            const referrer = document.referrer;
            console.log(referrer);
        
            if (Referrer === referrer) {
                $("#password").val("");
                $('#login').toggleClass('blink_correct');
                
                // Umleiten zur Chat-Seite
                window.location.href = "./chat.html";
                return;
            }
    
            // Lesen der Benutzereingabe
            const userInput = $("#password").val();
    
            // Abrufen des Admin-Passworts aus der Konfigurationsdatei
            $.ajax({
                url: '../sensitive-data/getJasminPassword.php',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    const adminPassword = response.adminPassword;
    
                    if (userInput === adminPassword) {
                        $("#password").val("");
                        $('#login').toggleClass('blink_correct');
                        
                        // Umleiten zur Chat-Seite
                        window.location.href = "/nested/chat.html";
                    } else {
                        console.log("Falsches Passwort. Bitte versuchen Sie es erneut.");
                        $("#password").val("");
                        $('#login').toggleClass('blink_false');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('AJAX-Fehler:', textStatus, errorThrown);
                    console.log('Serverantwort:', jqXHR.responseText);
                    console.log('Statuscode:', jqXHR.status);
                    console.log('Antwort-Header:', jqXHR.getAllResponseHeaders());
                }
            });
        });
    });
});



