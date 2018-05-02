var keys = require("./keys.js")
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// inquirer.prompt([
//     {
//       type: "list",
//       name: "requestType",
//       message: "LIRI can you do a few things for you, choose one.",
//       choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
//     }

//   ]).then(function(request) {
//       console.log("Request:", request.requestType);
//   })

var nodeArgs = process.argv;

var requestType = nodeArgs[2]

var requestInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    requestInput = requestInput + " " + nodeArgs[i];
}

console.log("request type:", requestType);
console.log("request input:", requestInput);

var getSpotify = function () {
    spotify
        .search({
            type: 'track',
            query: requestInput
        })
        .then(function (response) {
            console.log(response);
            console.log(`
    Artist(s): ${console.log(JSON.stringify(response.tracks, null, 2))}
    The song's name: ${requestInput}
    A preview link of the song from Spotify: ${requestInput}
    The album that the song is from: ${requestInput}`);
        })
        .catch(function (err) {
            console.log(err);
        })
};

switch (requestType) {
    case 'my-tweets':
        console.log(`Tweets:`);
        break;
    case 'spotify-this-song':
        spotify
            .search({
                type: 'track',
                query: requestInput
            })
            .then(function (response) {
                console.log(response);
                console.log(`
            Artist(s): ${console.log(JSON.stringify(response.tracks, null, 2))}
            The song's name: ${requestInput}
            A preview link of the song from Spotify: ${requestInput}
            The album that the song is from: ${requestInput}`);
            })
            .catch(function (err) {
                console.log(err);
            });
        break;
    case 'movie-this':
        console.log("These are your last 20 tweets");
        break;
    case 'do-what-it-says':
        console.log("These are your last 20 tweets");
        break;

    default:
        console.log("Bad-Request");
        break;
}