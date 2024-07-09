$(document).ready(function() {
    $("#Password").css("display", "flex");
    $('#password').focus();

    $('#submitpassword').click(function(event) {
        event.preventDefault();
        // Lese das eingegebene Passwort
        const userInput = $("#password").val();

        $.ajax({
            url: '../sensitive-data/getAdminPassword.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                const adminPassword = response.adminPassword;

                if (userInput === adminPassword) {
                    $("#password").val("");
                    $('#login').toggleClass('blink_correct');
                    $("#Password").css("display", "none");

                    $('#newGame').click(function(event) {
                        event.preventDefault();
                
                        $.ajax({
                            url: '../sensitive-data/memory/newGame.php',
                            type: 'GET',
                            dataType: 'json',
                            success: function() {
                                console.log("IDs in images geshuffelt");
                            },
                            error: function() {
                                console.log("IDs nicht geshuffelt");
                            }
                        });
                    });

                    let clickedCards = 0;

                    $('.card').click((event) => {
                        let divID = $(event.currentTarget).attr('id');
                        let numericBackID = parseInt(divID, 10);  // Konvertiert die ID zu einer Zahl
                        let resultBack = numericBackID + 20;
                        let resultFront = numericBackID + 40;

                        console.log(resultBack);

                        $.ajax({
                            url: '../sensitive-data/memory/card_img.php',
                            type: 'GET',
                            dataType: 'json',
                            success: function(response){
                                if(Array.isArray(response)){
                                    if(response.length === 0){
                                        return;
                                    }

                                    response.forEach(function(image){
                                        if(image.id == divID){
                                            let img = new Image();
                                            img.onload = function() {
                                                $(event.currentTarget).toggleClass('flip');
                                                $(`#${resultBack}`).css('background-image', `url(${image.path})`);
                                                $(`#${resultBack}`).css('backface-visibility', 'visible');
                                                $(`#${resultFront}`).css('backface-visibility', 'visible');

                                            };
                                            img.src = image.path;
                                        }
                                    });
                                }
                                clickedCards += 1;
                                if(clickedCards >= 2){
                                    //Hier die Spiellogik in der die clicked Pictures verglichen werden
                                    alert("Spiellogik noch nicht integriert :(")
                                };
                            }
                        });
                    });
                }
            },
            error: function() {
                console.log("Passwort falsch");
            }
        }); 
    });
});
