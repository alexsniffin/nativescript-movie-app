var http = require("http");
var OmdbModel = require("../../models/omdb/omdb-model");

const key = "53f133e4"
const api = (productName) => "https://www.omdbapi.com/?t=" + productName + "&apikey=" + key

const badWords = ["blu", "ray", "dvd", "digital", "hd"]

exports.getMovie = function (productName, callback) {
    var regex = /\w+/g;

    var match = productName.match(regex);

    var filteredMatch = match.filter(word => !badWords.includes(word.toLowerCase()));

    var newProductName = encodeURIComponent(filteredMatch.join(' '));

    var url = api(newProductName);

    http.getJSON(url).then(result => {
        if (result != undefined) {  
            var models = new OmdbModel(result.Year, result.Rated, result.imdbRating, result.Released, result.Runtime, result.Genre, result.Director, result.Writer, result.Language);
            
            callback (models);
        }
    }, (error) => {
        console.log("Error getting weather data from API! Result: " + e)
    });
}