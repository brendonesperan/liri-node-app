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

var movieName = "mr+nobody";
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



switch(command) {
    case "concert-this":
    concertThis();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;
}

// concert-this
function concertThis() {

}



// spotify-this-song
function spotifyThisSong() {
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
function movieThis() {
    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Release Year: " + JSON.parse(body).Year);

          console.log(` * ${body.Title}
          * ${body.Year}
          * ${body.imdbRating}
          * ${body.Ratings[1]}
          * ${body.Country}
          * ${body.Language}
          * ${body.Plot}
          * ${body.Actors}`);
        }
      });
      
}



// do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var randomArr = data.split(",");

        // set global var "command" equal to randomArr[0]
        // run switch statement using new randomArr[0] command
        // call correct method using name data from randomArr[1]
    });
}

