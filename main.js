$(document).ready(function () {

    const chatMessages = [
        {
            msg: "Who are you?",
            delay: 2000,
            type: "sent"
        },
        {
            msg: "Hey there!",
            delay: 4000,
            type: "received"
        },
        {
            msg: "Yo man!",
            delay: 3000,
            type: "sent"
        },
        {
            msg: "We're having fun yo",
            delay: 2000,
            type: "received"
        },
        {
            msg: "That's neat bro I love the feel of this chat it's rad.",
            delay: 2000,
            type: "received"
        },
        {
            msg: "Love it. I mean it.",
            delay: 2000,
            type: "received"
        },
        {
            msg: "What about some porridge",
            delay: 2000,
            type: "sent"
        },
        {
            msg: "Porridge is great foo man.",
            delay: 2000,
            type: "sent"
        },
        {
            msg: "Let's eat like pigs, I say.",
            delay: 2000,
            type: "received"
        }
    ];

    var chatDelay = -1000;

    function onRowAdded() {
        const scrollHeight = $('.conversation').prop('scrollHeight');
        $('.conversation').animate( { scrollTop: scrollHeight }, scrollHeight );
    };
    
    $.each(chatMessages, function(_index, obj) {
        const messageNumber = chatMessages.length;
        console.log("Number of messages: " + messageNumber + ", currently at index " + _index);
        chatDelay = chatDelay + 1000; // between each message
        const chatDelay2 = chatDelay + obj.delay; // time spinning
        const chatDelay3 = chatDelay2 + 10; // after spinning stops
        const scrollDelay = chatDelay;
        const chatTimeString = " ";
        obj.name = _index + 1;

        // if (obj.showTime == true) {
        // chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
        // }
        // $(".conversation").append("<div class='messages messages--" + obj.type + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.type + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='message message-" + obj.name + "' hidden>" + obj.msg + "</div></div>");

        // Close previous block and begin a new .messages block
        const newMessageBlock = `
            <div class="messages messages--${obj.type}">
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
            </div>          
        `;

        // Just expand the current .messages block
        const continueCurrentBlock = ` 
            <!-- continueCurrentBlock starts -->
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
            <!-- continueCurrentBlock ends -->
        `;

        let prevMessageSameType = $('.messages:last-child').hasClass(`messages--${obj.type}`);
        if ( ! prevMessageSameType ) {
            // If current message has a different type from previous one
            // Then create a new .messages block
            $(".conversation").append(newMessageBlock);
        } else {
            // Else (if current message has same type as previous one)
            // Then insert in existing .messages block
            $('.messages:last-child').append(continueCurrentBlock);
        };

        // load box on page, hide spinner after main message delay, fade in message text inside box
        msgname = "." + obj.name;
        $(msgname).delay(chatDelay).fadeIn(); // appear all div after previous message

        spinner = ".sp-" + obj.name;
        $(spinner).delay(chatDelay2).hide(1); // spins during "chatDelay2" time then hides

        msginner = ".message-" + obj.name;
        $(msginner).delay(chatDelay3).fadeIn(); // text appears just after spinner goes out 

        
        // scroll
        setTimeout(onRowAdded, chatDelay);
        setTimeout(onRowAdded, chatDelay3);
        chatDelay = chatDelay3;
    });

});