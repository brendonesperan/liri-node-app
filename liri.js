var request = require("request");
var moment = require("moment");
var dontenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("keys.js");
var fs = require("fs");

var spotify = new Spotify({
    id: f617959717c84ba8b77658692729c304,
    secret: e8816bc2fdef4252a29b5ebacdef9c04
  });
   
spotify
    .search(
        { type: 'track', query: 'All the Small Things' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });

var nodeArgs = process.argv;




// concert-this



// spotify-this-song



// movie-this



// do-what-it-says



