var Sqlite = require( "nativescript-sqlite" );

function checkTables(db) {
    db.execSQL("CREATE TABLE IF NOT EXISTS barcode (id INTEGER PRIMARY KEY AUTOINCREMENT, upc INTEGER, productName TEXT, manufacturer TEXT, longDescription TEXT, image TEXT)")
    db.execSQL("CREATE TABLE IF NOT EXISTS omdb (id INTEGER PRIMARY KEY AUTOINCREMENT, barcodeID INTEGER, year TEXT, rated TEXT, rating TEXT, release TEXT, time TEXT, genre TEXT, director TEXT, writers TEXT, language TEXT, FOREIGN KEY (barcodeID) REFERENCES barcode(id))")
}

exports.start = function (callback) {
    new Sqlite("mobileMovies.db", function(err, db) {
        if (err) {
            console.error("We failed to open database: ", err);
        } else {
            console.log("Database opened: ", db.isOpen() ? "Yes" : "No");
            
            // Validate tables
            checkTables(db);

            // Return db instance
            callback(db);
        }
    });
}