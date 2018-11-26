// const chatMessages = require('./chatMessages/chat1');
import { chatMessages } from './chatMessages/chat1.js';

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
     * Device time (with moment.js)
     */
    
    $(".status-bar .time").html( moment().format('h:mm') ).show(1000);

    /*
     * Stop Confeti
     */
    $(".stop-confeti").one("click", stopConfeti);

    function stopConfeti() {
        $("#confeti").hide(200);
    }

    /*
     * Device Switcher 
     */

    let currentDevice = "iphone-x";
    $("#device-select").on('change', function() {
        $(".marvel-device").removeClass(currentDevice).addClass(this.value ? this.value : currentDevice );
        currentDevice = this.value;
    });


    /*
     * Full Reset 
     */

    $('.reset').click(function() {
        location.reload();
    });


    /*
     * Manage Hovering
     */
    // $(".start-hovering").click(manageHovering);
    // let hoveringState = false;
    // function manageHovering() {
    //     $(".marvel-device").removeClass("animated fadeInUp").toggleClass("hover-animation", 1000);
    //     // $(".marvel-device").removeClass("animated fadeInUp").animate({
    //     //     "box-shadow": "0 5px 15px 0px rgba(0,0,0,0)"
    //     // }, 6000);
    //     // $(".marvel-device").toggleClass("hover-animation");
    //     hoveringState = !hoveringState;
    //     $(".start-hovering").html( hoveringState ? "NO-HOVER" : "HOVER" );
    // }

    /*
    * Timer 
    */       
    var totalChatDelay = 0;
    const messageCount = chatMessages.length;
    $(".timer").html(`
        <span class='timer__title'>DURATION</span> <span class='timer__data timer__duration'>N/A</span><br>
        <span class='timer__title'>MESSAGES</span> <span class='timer__data'>${messageCount}</span>
    `);


    /*
     * Only start the whole show on button click 
     */

    $(".start-show").one("click", startShow);

    function startShow() {
        console.log("3, 2, 1... Start the machine!");

        // Hide Video Mark
        $(".video-mark").hide();

        /*
        * Remove hidden from .main-content
        * Adds animation for device entrance 
        */

        const showDevice = () => {
            $(".main-content").show();
            $(".marvel-device").addClass("animated fadeInUp");
        }
        setTimeout(showDevice, 400);

        /*
        * Animates the sequential appearance of chat messages 
        */

        function onRowAdded() {
            const scrollHeight = $('.conversation').prop('scrollHeight');
            $('.conversation').animate( { scrollTop: scrollHeight }, scrollHeight * 2 );
        };
        
        $.each(chatMessages, function(_index, obj) {
            totalChatDelay = totalChatDelay + 1000 + ( obj.delay ? obj.delay : 0 ); // before this message is triggered
            let currentWordsCount = chatMessages[_index].msg.split(" ").length; // timing based on length of current text
            const chatDelay2 = totalChatDelay + ( currentWordsCount * 80 ); // time spinning
            const chatDelay3 = chatDelay2 + 50; // after spinning stops
            const scrollDelay = totalChatDelay;
            obj.name = _index + 1;
            console.log("Message " + obj.name + "/" + messageCount + ". Durée : " + totalChatDelay/1000 + "s");

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
            const msgname = "." + obj.name;
            $(msgname).delay(totalChatDelay).fadeIn(); // appear all div after previous message

            const spinner = ".sp-" + obj.name;
            $(spinner).delay(chatDelay2).hide(300); // spins during "chatDelay2" time then hides

            const msginner = ".message-" + obj.name;
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
       
        // Timer gives duration based on global const
        $('.timer__duration').text(`${ totalChatDelay /1000 }s`);

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