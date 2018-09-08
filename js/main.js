$(document).ready(function () {

    // Emojis codes from https://afeld.github.io/emoji-css/
    const chatMessages = [
        {
            msg: 'Who are you <i class="em em-cookie"></i>?',
            type: "sent"
        },
        // {
        //     msg: "Hey there!",
        //     type: "received"
        // },
        // {
        //     msg: 'This is a list for you<br>• first item<br>• second item',
        //     type: "received"
        // },
        // {
        //     msg: "Yo man!",
        //     type: "sent",
        //     delay: 4000
        // },
        // {
        //     msg: "We're having fun yo",
        //     type: "received"
        // },
        // {
        //     msg: "That's neat bro I love the feel of this chat it's rad.",
        //     type: "received"
        // },
        // {
        //     msg: "thumb",
        //     type: "received"
        // },
        // {
        //     msg: 'Love it. I mean it\'s <i class="em em-cool"></i>',
        //     type: "received"
        // },
        // {
        //     msg: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
        //     type: "received"
        // },
        // {
        //     msg: "What about some porridge",
        //     type: "sent"
        // },
        // {
        //     msg: "Porridge is great food man.",
        //     type: "sent"
        // },
        // {
        //     msg: "Let's eat like pigs, I say.",
        //     type: "received"
        // },
        // {
        //     msg: '<i class="em em-tada"></i> And don\'t forget to chat with us on <span class="accent">fb.me/lyketil</span>',
        //     type: "received"
        // }
    ];

    var chatDelay = 0;

    function onRowAdded() {
        const scrollHeight = $('.conversation').prop('scrollHeight');
        $('.conversation').animate( { scrollTop: scrollHeight }, scrollHeight * 2 );
    };
    
    $.each(chatMessages, function(_index, obj) {
        const messageNumber = chatMessages.length;
        chatDelay = chatDelay + 1000 + ( obj.delay ? obj.delay : 0 ); // before this message is triggered
        let currentWordsCount = chatMessages[_index].msg.split(" ").length; // timing based on length of current text
        const chatDelay2 = chatDelay + ( currentWordsCount * 250 ); // time spinning
        const chatDelay3 = chatDelay2 + 50; // after spinning stops
        const scrollDelay = chatDelay;
        const chatTimeString = " ";
        obj.name = _index + 1;

        // if (obj.showTime == true) {
        // chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
        // }
        // $(".conversation").append("<div class='messages messages--" + obj.type + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.type + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='message message-" + obj.name + "' hidden>" + obj.msg + "</div></div>");

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
                <div class="message message--thumb thumb"></div>
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
        $(msgname).delay(chatDelay).fadeIn(); // appear all div after previous message

        spinner = ".sp-" + obj.name;
        $(spinner).delay(chatDelay2).hide(300); // spins during "chatDelay2" time then hides

        msginner = ".message-" + obj.name;
        $(msginner).delay(chatDelay3).fadeIn(); // text appears just after spinner goes out 

        
        // scroll during the spinner
        setTimeout(onRowAdded, scrollDelay);
        // scroll once spinner disappears
        // setTimeout(onRowAdded, chatDelay3);
        chatDelay = chatDelay3;
    });
    // end of .each loop

    // end animation with some celebration 
    const beginCelebration = () => {
        // start the confetis
        step();

        // bring on the party animal
        const addPartyAnimal = () => {
            $("body").append("<div class='celebration-animal'></div>");
        }
        setTimeout(addPartyAnimal, 2000);
    }

    setTimeout(beginCelebration, 3000);
});