var http = require("http");
var ObservableArray = require("data/observable-array").ObservableArray;
var addViewModel = require("../views/add/add-view-model");

const key = "53f133e4"
const api = (productName) => "http://www.omdbapi.com/?t=" + productName + "&apikey=" + key

exports.getMovie = function (productName, callback) {
    // Empty array of models

        var models = new ObservableArray();

        models.load = function () {
            http.getJSON(api(movieID)).then(result=>{
                if (result != undefined) {
                    result.forEach(item=>{
                        models.push({
                            year: item.year, 
                            rated: item.rated,
                            rating: item.imdbRating,
                            release: item.released,
                            time: item.runtime, 
                            genre: item.genre,
                            director: item.director, 
                            writers: item.writer, 
                            language: item.language,
                        })
                    })
                    // Map to a view model
                    console.log(result[0].details.product_name);
                }
            }, function (error) {
                Console.log("Error getting weather data from API! Result: " + e)
            });

        }
    

    return models;
    }