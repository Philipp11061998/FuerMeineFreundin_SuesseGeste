$(document).ready(function() {

    $("#ChatPassword").css("display", "flex");
    
        $('#submitpassword').click(function(event) {
            event.preventDefault();
        // Lese das eingegebene Passwort
        const userInput = $("#password").val();

        // Hier müsstest du das Admin-Passwort aus der Konfigurationsdatei laden
        // Beispielhaftes Laden des Admin-Passworts aus einer Konfigurationsdatei
        $.ajax({
            url: '../sensitive-data/getAdminPassword.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                const adminPassword = response.adminPassword;

                if (userInput === adminPassword) {
                    $("#password").val("");
                    $('#login').toggleClass('blink_correct');
                    $("#ChatPassword").css("display", "none");
                    LoadChatFirst();

                    LoadChat();
                    // Lade alle 2 Sekunden neue Nachrichten
                    setInterval(LoadChat, 2000);

                    $("#sendMessage").click(function(event) {
                        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
                        const userInput = $("#message").val();
                        $('#message').val("");
                
                        $.ajax({
                            url: '../sensitive-data/sendmessagePhilipp.php',
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
                                    if(response.length === 0){
                                        return;
                                    }
                                    $("#emptyMessages").remove();
                                    $('#chatbubbles').empty();
                                    response.forEach(function(message) {
                                        // Erstelle ein neues DOM-Element für jede Nachricht
                                        const messageElement = $(`<div class="message" id=${message.id}></div>`);
                                        let ppElement
                                            
                                        if(message.sender === "jasminibini"){
                                            ppElement = $(`<img class="pp" src="../lib/img/profilePictures/j_pp.jpg" alt="">`);
                                            messageElement.append(ppElement);
                                            messageElement.addClass("jasminibini");
                                        } else if (message.sender === "philipp"){
                                            ppElement = $(`<img class="pp" src="../lib/img/profilePictures/p_pp.jpg" alt="">`);
                                            messageElement.append(ppElement);
                                            messageElement.addClass("philipp");
                                        }
            
                                        messageElement.append(ppElement);
                                        messageElement.append(document.createTextNode(message.messagetext));
                
                                        // Füge das Element zum Chat-Fenster hinzu
                                        $('#chatbubbles').append(messageElement);
                
                                        // Stelle sicher, dass das Element vorhanden ist, bevor du scrollIntoView() aufrufst
                                        messageElement[0].scrollIntoView({ behavior: 'smooth', block: 'end' });
                                    });
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                if(response === ""){
                                    return;
                                }
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
                                    if(response.length === 0){
                                        return;
                                    }
                                    $("#emptyMessages").remove();
                                    response.forEach(function(message) {
                                        // Überprüfe, ob die Nachricht eine ID hat und ob sie neu ist
                                        if (message.id ) {
                                            let lastMessageId = $('#chatbubbles').children().last().attr('id');
                                            // Überprüfe, ob die Nachricht eine andere ID hat und größer ist als die letzte Nachricht
                                            if (lastMessageId !== undefined && (message.id !== lastMessageId && parseInt(message.id) > parseInt(lastMessageId))) {
                                                // Erstelle ein neues DOM-Element für jede Nachricht
                                                const messageElement = $(`<div class="message" id=${message.id}></div>`);
                                                let ppElement
                                                    
                                                if(message.sender === "jasminibini"){
                                                    ppElement = $(`<img class="pp" src="../lib/img/profilePictures/j_pp.jpg" alt="">`);
                                                    messageElement.append(ppElement);
                                                    messageElement.addClass("jasminibini");
                                                } else if (message.sender === "philipp"){
                                                    ppElement = $(`<img class="pp" src="../lib/img/profilePictures/p_pp.jpg" alt="">`);
                                                    messageElement.append(ppElement);
                                                    messageElement.addClass("philipp");
                                                }
            
                                                messageElement.append(ppElement);
                                                messageElement.append(document.createTextNode(message.messagetext));
                        
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
                                if(response === ""){
                                    return;
                                }
                                console.error('AJAX error:', textStatus, errorThrown);
                                console.log('Server response:', jqXHR.responseText);
                                console.log('Status code:', jqXHR.status);
                                console.log('Response headers:', jqXHR.getAllResponseHeaders());
                            }
                        });
                    }
                } else {
                    console.log("Falsches Passwort. Bitte versuchen Sie es erneut."); // Anzeigen einer Fehlermeldung bei falschem Passwort
                    $("#password").val("");

                    $('#login').toggleClass('blink_false');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus, errorThrown);
                console.log('Server response:', jqXHR.responseText);
                console.log('Status code:', jqXHR.status);
                console.log('Response headers:', jqXHR.getAllResponseHeaders());
            }
        });
    });        
});
