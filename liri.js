var request = require("request");
var moment = require("moment");
var dontenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");

// var spotify = new Spotify({
//     id: f617959717c84ba8b77658692729c304,
//     secret: e8816bc2fdef4252a29b5ebacdef9c04
// });
// replaces above code
var spotify = new Spotify(keys.spotify);
   


// var nodeArgs = process.argv;
var command = process.argv[2];
var inputName = process.argv.slice(3).join("-");

// var textCommand = "";
// var textName = "";

// var movieName = "mr+nobody";
// var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// var bandName;
// var bandUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
var timeFormat = "MM/DD/YYYY";



function commandReader(command) {
    // console.log("Reached 0");
    switch(command) {
        case "concert-this":
        concertThis(inputName);
        break;

        case "spotify-this-song":
        spotifyThisSong(inputName);
        break;

        case "movie-this":
        movieThis(inputName);
        break;

        case "do-what-it-says":
        doWhatItSays();
        break;

        default:
        console.log("Command not recognized.");
    }
}



// concert-this
function concertThis(band) {
    // console.log("Reached 1");
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(body);
            var bodyInfo = JSON.parse(body);
            // var date = bodyInfo[0].datetime.slice(0,10).toString();
            // var m = moment(date, timeFormat);
            // console.log("Preslice: " + date);
            // console.log("Moment: " + m);
            console.log(`
For artist:     ${band}
Venue:          ${bodyInfo[0].venue.name}
Location:       ${bodyInfo[0].venue.city}
Date:           ${moment(bodyInfo[0].datetime).format(timeFormat)} 
            `)
        }
    })    
}



// spotify-this-song
function spotifyThisSong(song) {
    // console.log("Reached 2");
    if (!song) {
        song = "The Sign Ace of Base";
    }
    spotify
        .search({ type: "track", query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            else {
                // console.log(data);
                console.log(`
Artist(s):      ${data.tracks.items[0].album.artists[0].name}
Song:           ${data.tracks.items[0].name}
Preview:        ${data.tracks.items[0].preview_url}
Album:          ${data.tracks.items[0].album.name}
                `);
                
            }
        })
}



// movie-this
function movieThis(movie) {
    // console.log("Reached 3");
    if (!movie) {
        movie = "mr+nobody";
    }
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn"t obvious. Just spend a few moments dissecting it).
          console.log("Release Year: " + JSON.parse(body).Year);

          bodyInfo = JSON.parse(body);

          console.log(`
Title:                  ${bodyInfo.Title}
Year:                   ${bodyInfo.Year}
IMDB Rating:            ${bodyInfo.imdbRating}
Rotten Tomatoes Rating: ${bodyInfo.Rotten_Tomatoes}
Country:                ${bodyInfo.Country}
Language:               ${bodyInfo.Language}
Plot:
${bodyInfo.Plot}
Actors:                 ${bodyInfo.Actors}
        `);
        }
      });
      
}



// do-what-it-says
function doWhatItSays() {
    // console.log("Reached 4");
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var randomArr = data.split(",");
        
        var textCommand = randomArr[0];
        inputName = randomArr[1];

        commandReader(textCommand);

        // set global var "command" equal to randomArr[0]
        // run switch statement using new randomArr[0] command
        // call correct method using name data from randomArr[1]
    });
}



// now run the program
commandReader(command);