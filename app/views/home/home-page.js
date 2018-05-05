var view = require("ui/core/view");
var frameModule = require("ui/frame");
var HomeViewModel = require("../../models/home/home-view-model");
var barcodeService = require("../../services/barcode");
var db = require("../../data_layer/db/sql-lite");
var ObservableArray = require("data/observable-array").ObservableArray;
var observableModule = require("data/observable");
var MovieModel = require("../../models/movie/movie-model");

var page;
var dbContext;
var homeViewModel = new HomeViewModel();
var observableMovies = new ObservableArray();

function pageLoaded(args) {
    //dynamic binding to home-view-model array
    page = args.object;

    const context = page.navigationContext;

    if (context != undefined ) {

    }
    
    // create a database context and set up the page
    db.start(context => {
        dbContext = context;
        

        dbContext.all('select * from barcode left join omdb on barcode.id == omdb.barcodeID', function(err, resultSet) {
            console.log("Result set is:", resultSet);
            
            if (resultSet.length == 0) {
                // TODO show something 
            }

            resultSet.forEach(result => {
                // result[0] is barcode id, and result[6] is omdb id, result[7] is foreign key for barcode
                console.log(result.productName);
                
                var model = new MovieModel(
                    result[1], 
                    result[2], 
                    result[3], 
                    result[4], 
                    result[5],
                    result[8],
                    result[9],
                    result[10],
                    result[11],
                    result[12],
                    result[13],
                    result[14],
                    result[15],
                    result[16],
                    result[17]
                );

                console.log(model.productName);

                // Add to array
                observableMovies.push(model);
            });

            view.getViewById(page, "myStack").animate({
                opacity: 1,
                duration: 5000
            });

            var bindingObjs = observableModule.fromObject({
                observableMovies: observableMovies,
                // Other binding objects
            });
          
            // Bind results
            page.bindingContext = bindingObjs;
        });
    });
}

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

exports.selectMovie = selectMovie;
exports.onUpcTap = onUpcTap;
exports.onAddTap = onAddTap;
exports.pageLoaded = pageLoaded;
