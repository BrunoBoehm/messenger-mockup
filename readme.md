# Messenger Mockup

Facebook messenger mockup with text animation capabilities, made for simulating dialogue on a chat instance.

Works based on an array of objects containing the messages and their parameters
```js
const chatMessages = [
    {
        name: "ms1",
        msg: "Who are you?",
        delay: 500,
        type: "sent"
    },
    {
        name: "ms2",
        msg: "Hey there!",
        delay: 1000,
        type: "received"
    },
    {
        name: "ms3",
        msg: "Yo man!",
        delay: 3000,
        type: "sent"
    },
    {
        name: "ms4",
        msg: "We're having fun yo",
        delay: 2000,
        type: "received"
    }
];    
```

Based on the amazing [Devices CSS](http://marvelapp.github.io/devices.css/)
Inspired by 
- [ZenoRocha's pen](https://codepen.io/zenorocha/pen/eZxYOK) featuring a whatsapp version
- [Clemens' pen](https://codepen.io/clemens/pen/kXZWOK) work on automating post timing
- [Tim Guignard's pen](https://codepen.io/TimGuignard/pen/wgOXjr) for styling the FB messenger version
- The awesome celebrations from Asana
- [Trello's confettis](https://codepen.io/surjithctly/pen/epGdPQ) on codepen