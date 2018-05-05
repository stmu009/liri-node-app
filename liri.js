var keys = require("./keys.js")

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;

var requestType = nodeArgs[2]

var requestInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    requestInput = requestInput + " " + nodeArgs[i];
}

console.log("request me type:", requestType);
console.log("request input:", requestInput);

var spotifyThis = function () {
    if (requestInput === "") {
        requestInput = "The Sign Ace of Base"
    }
    spotify
        .search({
            type: 'track',
            query: requestInput
        })
        .then(function (response) {
            var artist = JSON.stringify(response.tracks.items[0].artists[0].name);
            var song = JSON.stringify(response.tracks.items[0].name);
            var preview = JSON.stringify(response.tracks.items[0].album.external_urls.spotify);
            var album = JSON.stringify(response.tracks.items[0].album.name);
            console.log(JSON.stringify(response.tracks.items[0], null, 2))

            console.log(`
    Artist(s): ${artist}
    The song's name: ${song}
    A preview link of the song from Spotify: ${preview}
    The album that the song is from: ${album}`);
        })
        .catch(function (err) {
            console.log(err);
        })
};

var myTweets = function () {
    console.log(`Tweets:`);

    var params = {
        screen_name: 'stmu009',
        count: 20
    };


    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var outputStr = '------------'
            for (var i = 0; i < tweets.length; i++) {
                outputStr += 'Created on: ' + tweets[i].created_at + '\n' +
                    'Tweet content: ' + tweets[i].text + '\n' +
                    '-----------\n';
            }
            console.log(outputStr);
        }
        else{console.log("Tweet Error....!!!!");}
    });
}


var movieThis = function () {
    console.log("Movie This:");
}

var doWhat = function () {
    console.log("do what it says");
}


switch (requestType) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhat();
        break;
    default:
        console.log("Bad-Request");
        break;
}