var twit = require('twit/lib/twitter');
var config = require('./config.js');
var listMessages = require('./messages.js');

var Twitter = new twit(config);

var messageLocation = Math.floor(Math.random() * listMessages.messages.count());
var messageNumber = 1;

var writeTweet = function() {
    Twitter.post('statuses/update', {
        status: "Reminder !" + "\n🌬️ " + listMessages.messages[messageLocation] + " 🌬️"
    }, function(err, data, response) {
        console.log(data)
    });
    messageNumber += 1;
    if(messageLocation < 1)
    {
        messageLocation += 1;
    } else {
        messageLocation = 0;
    }
};

writeTweet();

setInterval(writeTweet, 1000*60*60);