var http = require("http");
var OmdbModel = require("../../models/omdb/omdb-model");

const key = "53f133e4"
const api = (productName) => "http://www.omdbapi.com/?t=" + productName + "&apikey=" + key

exports.getMovie = function (productName, callback) {
    // Empty array of models

    http.getJSON(api(productName)).then(result => {
        if (result != undefined) {
                   
            var models = new OmdbModel(result.Year, result.Rated, result.imdbRating, result.Released, result.Runtime, result.Genre, result.Director, result.Writer, result.Language);
            callback (models);
        }
        
    }, function (error) {
        Console.log("Error getting weather data from API! Result: " + e)
    });

}