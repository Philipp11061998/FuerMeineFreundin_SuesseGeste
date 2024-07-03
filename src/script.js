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

    $("#sendMessage").click(function(event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        const userInput = $("#message").val();
        console.log(userInput);

        $.ajax({
            url: '../sensitive-data/sendmessageJasmin.php',
            type: 'POST',
            data: {
                message: userInput,
            },
            success: function(response) {
                console.log('Message sent successfully:', response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus, errorThrown);
                console.log('Server response:', jqXHR.responseText);
                console.log('Status code:', jqXHR.status); // Gibt den Statuscode aus
                console.log('Response headers:', jqXHR.getAllResponseHeaders()); // Gibt die Response-Header aus
            }
        });
    });
    
    
    

    /*Das hier ist der Aufruf des Sendens .php
    sendMessage() {
        const formData = new FormData();
        formData.append('message', this.message);
        formData.append('csrf_token', this.csrfToken);

        fetch('sendmessageJasmin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Hier können Sie die Serverantwort verarbeiten, wenn benötigt
        })
        .then(data => {
            console.log('Message sent successfully:', data); // Optional: Serverantwort verarbeiten
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
        */

});

