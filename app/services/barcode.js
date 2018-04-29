var barcode = require("../data_layer/apis/barcode-api");

exports.getBarcodeData = function (upc, callback) {
    barcode.getFromUpc(upc, result => {
        callback(result);
    });
}

exports.getAndInsert = function (upc, dbContext, callback) {
    this.getBarcodeData(upc, result => {
        dbContext.execSQL("insert into barcode (upc, productName, manufacturer, longDescription, image) values (?, ?, ?, ?, ?)", [upc, result.productName, result.manufacturer, result.longDescription, result.image], function(err, id) {
            console.log("The new record id is:", id);
            
            // Return result and new id
            callback(id, result);
        });
    });
}