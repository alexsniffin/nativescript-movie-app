var view = require("ui/core/view");
var frameModule = require("ui/frame");
var HomeViewModel = require("../../models/home/home-view-model");
var barcodeService = require("../../services/barcode");
var db = require("../../data_layer/db/sql-lite");
var ObservableArray = require("data/observable-array").ObservableArray;
var BarcodeModel = require("../../models/barcode/barcode-model");

var page;
var dbContext;
var homeViewModel = new HomeViewModel();
var observableBarcodes = new ObservableArray();

function pageLoaded(args) {
    //dynamic binding to home-view-model array
    page = args.object;

    // create a database context and set up the page
    db.start(context => {
        dbContext = context;

        dbContext.all('select * from barcode', function(err, resultSet) {
            console.log("Result set is:", resultSet);

            if (resultSet.length == 0) {
                // TODO show something
            }

            resultSet.forEach(result => {
                // result[0] is id
                var model = new BarcodeModel(result[1], result[2], result[3], result[4], result[5]);

                // Add to array
                observableBarcodes.push(model);

                // Populate the UI
                page.getViewById('image0').src = model.image;
                page.getViewById("name0").text = model.productName;
                page.getViewById("desc0").text = model.longDescription;
                page.getViewById("year0").text = "";
            
                view.getViewById(page, "myStack").animate({
                    opacity: 1,
                    duration: 5000
                });
            });
        });
        
        /*
        example...
        barcodeService.getAndInsert("786936849769", dbContext, (id, result) => {
            console.log("ID : " + id + " and " + result);

            dbContext.all('select * from barcode', function(err, resultSet) {
                console.log("Result set is:", resultSet);
            });
        });*/
    });
}
exports.pageLoaded = pageLoaded;


function selectMovie(args) {
    //parse the movie info
    let myID =  args.object.id;
    let myMovie = page.getViewById(myID).id;
    let myIndex = myMovie;
    var stringLength = myIndex.length;
    var lastChar = myIndex.charAt(stringLength - 1);
    let movieTapped = homeViewModel[lastChar];


    //navigate to next page
    const navigateMovie = {
        moduleName: 'views/movie/movie-page',
        context: movieTapped ,
        animated: true,
        transition: {
            name: "slideLeft",
            curve: "easeInOut",
            duration: 800
        }
    };
    frameModule.topmost().navigate(navigateMovie);
};
exports.selectMovie = selectMovie;

onUpcTap = function () {
    console.log("Navigate to UPC Page from Home Page");
    const navigationUPC = {
        moduleName: "views/UPC/upc-page",
        animated: true,
        transition: {
            name: "slideBottom",
            curve: "easeInOut",
            duration: 800
        }
    };
    frameModule.topmost().navigate(navigationUPC);
};
exports.onUpcTap = onUpcTap;

onAddTap = function () {
    console.log("Navigate to Manual add Page from Home Page");
    const navigationAdd = {
        moduleName: "views/Add/add-page",
        animated: true,
        transition: {
            name: "slideBottom",
            curve: "easeInOut",
            duration: 800
        }
    };
    frameModule.topmost().navigate(navigationAdd);
};
exports.onAddTap = onAddTap;
