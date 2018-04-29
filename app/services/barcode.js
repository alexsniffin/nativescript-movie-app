var barcode = require("../data_layer/apis/barcode-api");

exports.getBarcodeData = function (upc, callback) {
    barcode.getFromUpc(upc, result => {
        callback(result);
    });
}

exports.getOmdbData = function (productName, callback) {
    barcode.getMovie(productName, result => {
        callback(result);
    });
}

exports.getAndInsert = function (upc, dbContext, callback) {
    this.getBarcodeData(upc, barCodeResult => {
        dbContext.execSQL("insert into barcode (upc, productName, manufacturer, longDescription, image) values (?, ?, ?, ?, ?)", [upc, barCodeResult.productName, barCodeResult.manufacturer, barCodeResult.longDescription, barCodeResult.image], function (err, id) {
            console.log("The new record id is:", id);

            // Return result and new id
            this.getOmdbData(barCodeResult.productName, omdbResult => {
                dbContext.execSQL("insert into omdb (id, barcodeID, year, rated, rating, release, time, genre, director, writers, language) values (?,?,?,?,?,?,?,?,?,?)", [omdbResult.barcodeID, omdbResult.year, omdbResult.rated, omdbResult.rating, omdbResult.release, omdbResult.time, omdbResult.genre, omdbResult.director, omdbResult.writers, omdbResult.language], function (err, id) {
                    callback(id, barCodeResult, omdbResult);
                });
            });
        });
    });
}