// Emojis codes from https://afeld.github.io/emoji-css/
const chatMessages = [
    {   // QUESTION
        msg: "Comment je fais pour avoir plus de clients grâce à internet ?",
        type: "sent"
    },{
        msg: "Salut!",
        type: "received"
    }, {
        msg: `Ah ça c'est notre rayon <i class="em em-muscle"></i>`, 
        type: "received"
    },
    {
        msg: "thumb",
        type: "sent"
    },
    {
        msg: "COOL... J'aimerais bien développer mon business avec le web.",
        type: "sent"
    },
    {
        msg: "OK, en bref et en simplifiant la recette c'est :",
        type: "received"
    },
    {
        msg: "1. Une bonne <b>stratégie</b> (choisir vos priorités et comment tenter de les atteindre)",
        type: "received"
    },
    {
        msg: "2. Du bon <b>contenu</b> (photos, vidéos, textes, documents) pour bien expliquer ou donner envie !",
        type: "received"
    },
    {
        msg: '3. Un <b>site</b> ou une plateforme pour "convertir" les personnes intéressées en vrais contacts (futurs clients)',
        type: "received"
    },
    {
        msg: 'Et surtout de la régularité et un peu de persévérance <i class="em em-zap"></i><i class="em em-yum"></i>',
        type: "received"
    },
    {
        msg: 'OK... On commence quand?',
        type: "sent"
    },
    {
        msg: '<i class="em em-tada"></i> Cool! On va <span class="accent--medium">ACTIVER</span> votre présence digitale!',
        type: "received"
    },
    {
        msg: 'https://media.giphy.com/media/xULW8vuRXQYvaGJAQw/giphy.gif',
        type: "received"
    },
    {
        msg: 'D\'autres questions ? Contactez-nous<br> - sur le chat <span class="accent">fb.me/lyketil</span><br>- ou sur notre site <span class="accent--strong">lyketil.com</span>',
        type: "received"
    },  
];

$(document).ready(function () {

    $( ".zoom-o" ).click(function() {
        $(".main-content").css("transform", "scale(1, 1)"); 
    });
    $( ".zoom-s" ).click(function() {
        $(".main-content").css("transform", "scale(1.2, 1.2) translateY(-34px)"); 
    });
    $( ".zoom-m" ).click(function() {
        $(".main-content").css("transform", "scale(1.4, 1.4) translateY(-100px)"); 
    });
    $( ".zoom-l" ).click(function() {
        $(".main-content").css("transform", "scale(1.6, 1.6) translateY(-50px)"); 
    });
    $( ".zoom-xl" ).click(function() {
        $(".main-content").css("transform", "scale(1.8, 1.8) translateY(-200px)"); 
    });

    
    /*
     * Stop Confeti
     */
    $(".stop-confeti").one("click", stopConfeti);

    function stopConfeti() {
        $("#confeti").hide(200);
    }


    /*
     * Only start the whole show on button click 
     */

    $(".start-show").one("click", startShow);

    function startShow() {
        console.log("3, 2, 1... Start the machine!");

        /*
        * Remove hidden from .main-content
        * Adds animation for device entrance 
        */

        $(".main-content").show();
        $(".marvel-device").addClass("animated fadeInUp");

        /*
        * Animates the sequential appearance of chat messages 
        */

        var totalChatDelay = 0;

        function onRowAdded() {
            const scrollHeight = $('.conversation').prop('scrollHeight');
            $('.conversation').animate( { scrollTop: scrollHeight }, scrollHeight * 2 );
        };
        
        $.each(chatMessages, function(_index, obj) {
            const messageNumber = chatMessages.length;
            totalChatDelay = totalChatDelay + 1000 + ( obj.delay ? obj.delay : 0 ); // before this message is triggered
            let currentWordsCount = chatMessages[_index].msg.split(" ").length; // timing based on length of current text
            const chatDelay2 = totalChatDelay + ( currentWordsCount * 80 ); // time spinning
            const chatDelay3 = chatDelay2 + 50; // after spinning stops
            const scrollDelay = totalChatDelay;
            obj.name = _index + 1;
            console.log("Message " + obj.name + "/" + messageNumber + ". Durée : " + totalChatDelay/1000 + "s");

            const commentBlock = ` 
                <div class="message-wrapper ${obj.name}" hidden>
                    <div class="sp-${obj.name}">
                        <span class="spinme-${obj.type}">
                            <div class="spinner">
                                <div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>
                            </div>
                        </span>
                    </div>
                    <div class="message message-${obj.name}" hidden>
                        ${obj.msg}
                    </div>
                </div>
            `;

            const thumbBlock = `
                <div class="message-wrapper ${obj.name}" hidden>
                    <div class="message message--thumb thumb animated pulse infinite"></div>
                </div>
            `;

            const imageBlock = `
                <div class="message-wrapper with-image ${obj.name}" hidden>
                    <div class="sp-${obj.name}">
                        <span class="spinme-${obj.type}">
                            <div class="spinner">
                                <div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>
                            </div>
                        </span>
                    </div>
                    <div class="message message-${obj.name}" hidden>
                        <img class="image-message" src="${obj.msg}" />
                    </div>
                </div>            
            `;

            let insertMessage = "";
            const supportedMedia = [".jpg", ".png", ".gif"];

            if ( supportedMedia.some( el => obj.msg.includes(el) ) ) {
                insertMessage = imageBlock;
            } else if ( obj.msg == "thumb" ) {
                insertMessage = thumbBlock;
            } else {
                insertMessage = commentBlock;
            };

            let prevMessageSameType = $('.messages:last-child').hasClass(`messages--${obj.type}`);
            if ( ! prevMessageSameType ) {
                // If current message has a different type from previous one
                // Then create a new .messages block
                $(".conversation").append(`<div class="messages messages--${obj.type}">` + insertMessage + "</div>");
            } else {
                // Else (if current message has same type as previous one)
                // Then insert in existing .messages block
                $('.messages:last-child').append(insertMessage);
            };

            // load box on page, hide spinner after main message delay, fade in message text inside box
            msgname = "." + obj.name;
            $(msgname).delay(totalChatDelay).fadeIn(); // appear all div after previous message

            spinner = ".sp-" + obj.name;
            $(spinner).delay(chatDelay2).hide(300); // spins during "chatDelay2" time then hides

            msginner = ".message-" + obj.name;
            $(msginner).delay(chatDelay3).fadeIn(100, function(){
                $(this).find(".em").addClass("animated pulse infinite");
            }); // text appears just after spinner goes out, and emoji gets animated
            
            // scroll during the spinner
            setTimeout(onRowAdded, scrollDelay);
            // scroll once spinner disappears
            setTimeout(onRowAdded, chatDelay3);
            totalChatDelay = chatDelay3;
        });
        // end of .each loop
       

        /*
        * Ending celebrations 
        */

        // end animation with some celebration 
        const beginCelebration = () => {
            // start the confetis
            step();

            // bring on the party animal
            const addPartyAnimal = () => {
                $("body").append("<div class='celebration-animal'></div>");
            }
            setTimeout(addPartyAnimal, 1500);
        }

        setTimeout(beginCelebration, totalChatDelay);
    }; // close tag for startShow
});