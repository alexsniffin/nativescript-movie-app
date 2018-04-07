var http = require("http");
var WeatherViewModel = require("../views/weather/weather-view-model");

const key = "dykyx5ge5hmcdwfh4nt3hrxzximxps"
const api = (upcId) => "https://www.barcodelookup.com/restapi?barcode=" + upcId + "&formatted=y&key=" + key

exports.getBarcodeFor = async function (upcId = "786936849769") {
    // Empty array of models
    var models = new Array();

    await http.getJSON(api(upcID)).then(function (result) { 
        if (result[0].details.product_name != undefined) {
            // Map to a view model
            console.log(result[0].details.product_name);
        }
    }, function (e) {
        Console.log("Error getting weather data from API! Result: "+ e)
    });

    return models;
}