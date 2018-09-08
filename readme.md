# Messenger Mockup

Facebook messenger mockup with text animation capabilities, made for simulating dialogue on a chat instance.

Works based on an array of objects containing the messages and their parameters.
Support different types of messages:
- Basic text messages, use `<br>` for multiple lines
- Image messages: just input the link (.gif, .pgn, .jpg) and it will appear automagically
- Thumbs (just put `msg: "thumb"`)
- Emojis: copy paste the emoji code from [Emoji CSS](https://afeld.github.io/emoji-css/)
- Delay: if you want a message to appear after some pause time, just `delay: 3000` it (timing in milliseconds, would equal 3s)
- Supports 3 classes for bringing some accent to some text, use it like `<span class="accent">blabla</span>`
    - .accent
    - .accent--medium
    - .accent--strong
    
```js
const chatMessages = [
        {
            msg: "That's neat bro I love the feel of this chat it's rad.",
            type: "received"
        },
        {
            msg: "thumb",
            type: "received"
        },
        {
            msg: 'Love it. I mean it\'s <i class="em em-cool"></i>',
            type: "sent", 
            delay: 2000
        },
        {
            msg: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
            type: "received"
        },
        {
            msg: 'And don\'t forget to chat with us on <span class="accent">fb.me/lyketil</span>',
            type: "received"
        }
];    
```

Based on the amazing [Devices CSS](http://marvelapp.github.io/devices.css/)
Inspired by 
- [ZenoRocha's pen](https://codepen.io/zenorocha/pen/eZxYOK) featuring a whatsapp version
- [Clemens' pen](https://codepen.io/clemens/pen/kXZWOK) work on automating post timing
- [Tim Guignard's pen](https://codepen.io/TimGuignard/pen/wgOXjr) for styling the FB messenger version
- The awesome celebrations from Asana: [Narwhal](https://blog.asana.com/2016/03/new-celebrations-the-narwhal/), [Unicorn](https://blog.asana.com/2016/03/new-celebrations/), and [Yeti & Phoenix](https://blog.asana.com/2016/03/new-celebrations-meet-the-yeti/)
- [Trello's confettis](https://codepen.io/surjithctly/pen/epGdPQ) on codepen
- Cool buttons from [Angelfire](https://codepen.io/Angelfire/pen/opdDt)