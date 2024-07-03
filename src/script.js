$(document).ready(function() {
    let latestMessageId = null;

    LoadChatFirst();

    LoadChat();
    // Lade alle 2 Sekunden neue Nachrichten
    setInterval(LoadChat, 2000);

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
        $('#message').val("");

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

    function LoadChatFirst(){
        $.ajax({
            url: '../sensitive-data/loadMessagesJasmin.php',
            type: 'GET',
            success: function(response) {
                if (Array.isArray(response)) {
                    response.forEach(function(message) {
                        // Erstelle ein neues DOM-Element für jede Nachricht
                        const messageElement = $('<div class="message"></div>');
                        if(message.sender === "jasminibini"){
                            messageElement.addClass("jasminibini");
                        }
                        messageElement.text(message.messagetext);

                        // Füge das Element zum Chat-Fenster hinzu
                        $('#chatbubbles').append(messageElement);

                        // Aktualisiere die neueste Nachrichtentime-ID
                        latestMessageId = message.id;

                        messageElement.scollIntoView();
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus, errorThrown);
                console.log('Server response:', jqXHR.responseText);
                console.log('Status code:', jqXHR.status);
                console.log('Response headers:', jqXHR.getAllResponseHeaders());
            }
        });
    }

    function LoadChat() {
    $.ajax({
        url: '../sensitive-data/loadMessagesJasmin.php',
        type: 'GET',
        success: function(response) {
            if (Array.isArray(response)) {
                response.reverse();
                response.forEach(function(message) {
                    // Überprüfe, ob die Nachricht eine ID hat und ob sie neu ist
                    if (message.id && (latestMessageId === null || message.id > latestMessageId)) {
                        // Erstelle ein neues DOM-Element für jede Nachricht
                        const messageElement = $('<div class="message"></div>');
                        if(message.sender === "jasminibini"){
                            messageElement.addClass("jasminibini");
                        }
                        messageElement.text(message.messagetext);

                        // Füge das Element zum Chat-Fenster hinzu
                        $('#chatbubbles').append(messageElement);

                        // Aktualisiere die neueste Nachrichtentime-ID
                        latestMessageId = message.id;

                        messageElement.scollIntoView();
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
            console.log('Server response:', jqXHR.responseText);
            console.log('Status code:', jqXHR.status);
            console.log('Response headers:', jqXHR.getAllResponseHeaders());
        }
    });
}
});



