var barcode = require("../data_layer/apis/barcode-api");
var omdb = require("../data_layer/apis/omdb-api");

exports.getBarcodeData = function (upc, callback) {
    barcode.getFromUpc(upc, result => {
        callback(result);
    });
}

exports.getOmdbData = function (productName, callback) {
    omdb.getMovie(productName, result => {
        callback(result);
    });
}
/**
 * Usage:
 * barcodeService.getAndInsert("786936849769", dbContext, (barcodeId, omdbId, barCodeResult, omdbResult) => { });
 * @param {*} upc 
 * @param {*} dbContext 
 * @param {*} callback 
 */
exports.getAndInsert = function (upc, dbContext, callback) {
    var context = this;

    context.getBarcodeData(upc, barCodeResult => {
        var resolvedBarcodeId;

        dbContext.execSQL("insert into barcode (upc, productName, manufacturer, longDescription, image) values (?, ?, ?, ?, ?)", [upc, barCodeResult.productName, barCodeResult.manufacturer, barCodeResult.longDescription, barCodeResult.image], function (err, barcodeId) {
            console.log("The new record id is:", barcodeId);

            resolvedBarcodeId = barcodeId;

            // Return result and new id
            context.getOmdbData(barCodeResult.productName, omdbResult => {
                dbContext.execSQL("insert into omdb (barcodeID, year, rated, rating, release, time, genre, director, writers, language) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [resolvedBarcodeId, omdbResult.year, omdbResult.rated, omdbResult.rating, omdbResult.release, omdbResult.time, omdbResult.genre, omdbResult.director, omdbResult.writers, omdbResult.language], function (err, omdbId) {
                    callback(barcodeId, omdbId, barCodeResult, omdbResult);
                });
            });
        });
    });
}