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

    $('#chat').click(function(event) {
        // Zeigen des Passwortfeldes
        $("#ChatPassword").css("display", "flex");
    
        $('#submitpassword').click(function(event) {
            event.preventDefault();
    
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
                        window.location.href = "./nested/chat.html";
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
                LoadChat();
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
                    $('#chatbubbles').empty();
                    response.forEach(function(message) {
                        // Erstelle ein neues DOM-Element für jede Nachricht
                        const messageElement = $(`<div class="message" id=${message.id}></div>`);
                        if(message.sender === "jasminibini"){
                            messageElement.addClass("jasminibini");
                        } else if (message.sender === "philipp"){
                            messageElement.addClass("philipp");
                        }
                        messageElement.text(message.messagetext);

                        // Füge das Element zum Chat-Fenster hinzu
                        $('#chatbubbles').append(messageElement);

                        // Stelle sicher, dass das Element vorhanden ist, bevor du scrollIntoView() aufrufst
                        messageElement[0].scrollIntoView({ behavior: 'smooth', block: 'end' });
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
        let isLoading = false;

            if (isLoading) {
                return; // Verhindert das Ausführen, wenn bereits eine Anfrage läuft
            }
            isLoading = true;

        $.ajax({
            url: '../sensitive-data/loadMessagesJasmin.php',
            type: 'GET',
            success: function(response) {
                if (Array.isArray(response)) {
                    response.forEach(function(message) {
                        // Überprüfe, ob die Nachricht eine ID hat und ob sie neu ist
                        if (message.id ) {
                            let lastMessageId = $('#chatbubbles').children().last().attr('id');
                            // Überprüfe, ob die Nachricht eine andere ID hat und größer ist als die letzte Nachricht
                            if (lastMessageId !== undefined && (message.id !== lastMessageId && parseInt(message.id) > parseInt(lastMessageId))) {
                                // Erstelle ein neues DOM-Element für jede Nachricht
                                const messageElement = $(`<div class="message" id="${message.id}"></div>`);
                                if (message.sender === "jasminibini") {
                                    messageElement.addClass("jasminibini");
                                } else if (message.sender === "philipp") {
                                    messageElement.addClass("philipp");
                                }
                                messageElement.text(message.messagetext);

                                // Füge das Element zum Chat-Fenster hinzu
                                $('#chatbubbles').append(messageElement);

                                // Stelle sicher, dass das Element vorhanden ist, bevor du scrollIntoView() aufrufst
                                messageElement[0].scrollIntoView({ behavior: 'smooth', block: 'end' });
                            }

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



