var view = require("ui/core/view");
var frameModule = require("ui/frame");
var HomeViewModel = require("./home-view-model");
var barcode = require("../../services/barcode-api")

var page;
var homeViewModel = new HomeViewModel();

function pageLoaded(args) {
    //dynamic binding to home-view-model array
    page = args.object;
    page.bindingContext = page.navigationContext;

    barcode.getBarcodeFor("786936849769", function(viewModel) {
        console.log("HERE" + viewModel);
    });

    //loop thru array updating xml grid for each item
    for (var movieIndex = 0; movieIndex < homeViewModel.length; movieIndex++) {
        page.getViewById('image' + movieIndex ).src = homeViewModel[movieIndex].img;
        page.getViewById("name" + movieIndex).text = homeViewModel[movieIndex].name;
        page.getViewById("desc" + movieIndex).text = homeViewModel[movieIndex].description;
        page.getViewById("year" + movieIndex).text = homeViewModel[movieIndex].year;
    };

    //Animation
    view.getViewById(page, "myStack").animate({
        opacity: 1,
        duration: 5000
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
