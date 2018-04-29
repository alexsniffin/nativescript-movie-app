var http = require("http");

const key = "dykyx5ge5hmcdwfh4nt3hrxzximxps"
const api = (upcId) => "https://www.barcodelookup.com/restapi?barcode=" + upcId + "&formatted=y&key=" + key

exports.getBarcodeFor = function (upcId = "786936849769", callback) {
    http.getJSON(api(upcId)).then(result => {
        // Update models with weather API content
        result.list.forEach(weatherObj => observableArrResult.push(new WeatherViewModel(
            weatherObj.dt,
            weatherObj.temp,
            weatherObj.preasure,
            weatherObj.humidty,
            weatherObj.weather,
            weatherObj.speed,
            weatherObj.deg,
            weatherObj.clouds,
            weatherObj.snow
        )));
        
        callback(result);
    });
}