var frameModule = require("ui/frame");
var view = require("ui/core/view");
var page;

onLoaded = function (args) {
    const page = args.object;
    page.bindingContext = page.navigationContext;
    const context  = page.navigationContext;

    var inMovieName
    inMovieName = page.getViewById("movieLabel").text
    console.log('The movie selected is: ' + inMovieName)

};
exports.onLoaded = onLoaded;