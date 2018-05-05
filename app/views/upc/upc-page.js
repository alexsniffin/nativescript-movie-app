var view = require("ui/core/view");
var frameModule = require("ui/frame");
var barcodeService = require("../../services/barcode");
var db = require("../../data_layer/db/sql-lite");
var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
var barcodescanner = new BarcodeScanner();

var page;
var dbContext;

function pageLoaded(args) {
    //dynamic binding to home-view-model array
    page = args.object;

    const context = page.navigationContext;

    if (context != undefined ) {

    }

    // if no permission was granted previously this wil open a user consent screen
    barcodescanner.requestCameraPermission().then(() => {
        // create a database context and set up the page
        db.start(context => {
            dbContext = context;
        });
    });
}

tapScan = function() {
    barcodescanner.hasCameraPermission().then(
        function(granted) {
            scanUpc();
        }
    );
};

scanUpc = function() {
    barcodescanner.scan({
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
      }).then(
          function(result) {
            console.log("Scan format: " + result.format);
            console.log("Scan text:   " + result.text);
            barcodeService.getAndInsert(result.text, dbContext, (barcodeId, omdbId, barCodeResult, omdbResult) => {
                console.log("Added " + barCodeResult.productName);
                
                //navigate to home
                const nav = {
                    moduleName: 'views/home/home-page',
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        curve: "easeInOut",
                        duration: 800
                    }
                };
                frameModule.topmost().navigate(nav);
            });
          },
          function(error) {
            console.log("No scan: " + error);
          }
      );
}

exports.tapScan = tapScan;
exports.pageLoaded = pageLoaded;