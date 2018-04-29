var http = require("http");

const key = "dykyx5ge5hmcdwfh4nt3hrxzximxps"
const api = (upcId) => "https://www.barcodelookup.com/restapi?barcode=" + upcId + "&formatted=y&key=" + key

exports.getBarcodeFor = function (upcId = "786936849769", callback) {
    http.getJSON(api(upcId)).then(result => {
        // formart the data into a viewmodel
        // ...
        
        callback(result);
    });
}