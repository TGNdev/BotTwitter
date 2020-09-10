//for Twit (extension) + Twitter's API's keys
//import {messages} from "./messages";

var twit = require('twit/lib/twitter');
var config = require('./config.js');
var Twitter = new twit(config);

//messages that will be tweeted (from file messages.js)
var listMessages = require('./messages.js');

//control the messages that got twitted
var messageLocation = Math.floor(Math.random() * listMessages.messages.count());
var messageNumber = 1;

//contols the time when the tweets are send
const minuteOfTheHour = 0;      //we want to post every hour at **:00 (ex : 21:00)
let notYetPostedThisHour = true;
setInterval(timeCheck,1000*55);     //checks the time every 55 seconds

//post the message on Twitter
var writeTweet = function() {
    Twitter.post('statuses/update', {
        status: "Reminder No"+messageNumber+ " !" + "\n🌬️ " + listMessages.messages[messageLocation] + " 🌬️"
    }, function(err, data, response) {
        console.log(data)
    });
    //all this is for looping the message choice that got
    if(messageLocation < 1)
    {
        messageLocation += 1;
    } else {
        messageLocation = 0;
    }
};

//check the actual time
function timeCheck() {
    var now = new Date();
    if (now.getMinutes() == minuteOfTheHour) {      //if it's **:00 (ex : 21:00)
        if (notYetPostedThisHour) {         //if there's no tweet at the hour then tweet
            writeTweet();
            notYetPostedThisHour = false;
        }
    } else {
        notYetPostedThisHour = true;
    }
}