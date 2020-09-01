var twit = require('twit/lib/twitter');
var config = require('./config.js');

var Twitter = new twit(config);

var messages = ["Hello World ! Breathing is very important so don't forget to breathe !", "Hey ! I hope you didn't forget to breathe today !"];
var messageLocation = 0;
var messageNumber = 1;

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();

var writeTweet = function() {
    Twitter.post('statuses/update', {
        status: "Reminder N°" + messageNumber + ' // At ' + time + "\n🫁 " + messages[messageLocation] + " 🌬️"
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