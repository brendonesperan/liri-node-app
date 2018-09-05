var request = require("request");
var moment = require("moment");
var dontenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("keys.js");
var fs = require("fs");

// var spotify = new Spotify({
//     id: f617959717c84ba8b77658692729c304,
//     secret: e8816bc2fdef4252a29b5ebacdef9c04
// });
// replaces above code
var spotify = new Spotify(keys.spotify);
   

var nodeArgs = process.argv;

var command = process.argv[2];

switch(command) {
    case "concert-this":
    // stuff
    break;

    case "spotify-this-song":
    // stuff
    break;

    case "movie-this":
    // stuff
    break;

    case "do-what-it-says":
    // stuff;
    break;
}

// concert-this
function concert() {

}



// spotify-this-song
function spotifySong() {
    spotify
        .search(
            { type: 'track', query: 'The Sign' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(data);
            });
}



// movie-this



// do-what-it-says



