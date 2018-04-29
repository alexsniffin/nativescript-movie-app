var http = require("http");
var BarcodeModel = require("../../models/barcode/barcode-model");

const key = "0kyuzuke3se3p8qpkfs0wdln1e3l3w"
const api = (upcId) => "https://www.barcodelookup.com/restapi?barcode=" + upcId + "&formatted=y&key=" + key

exports.getFromUpc = function (upcId = "786936849769", callback) {
    http.getJSON(api(upcId)).then(result => {
        if (result.result[0] != undefined) {
            // Assume first result is correct
            var details = result.result[0].details;
            var image = result.result[0].images[0];

            // Map results to the model
            var model = new BarcodeModel(upcId, details.product_name, details.manufacturer, details.long_description, image)
            
            // Pass the model to the callback
            callback(model);
        }
    });
}