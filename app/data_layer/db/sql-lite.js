var Sqlite = require( "nativescript-sqlite" );

function checkTables(db) {
    db.execSQL("CREATE TABLE IF NOT EXISTS barcode (id INTEGER PRIMARY KEY AUTOINCREMENT, upc INTEGER, productName TEXT, manufacturer TEXT, longDescription TEXT, image TEXT)")
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