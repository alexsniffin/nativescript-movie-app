var frameModule = require("ui/frame");
var view = require("ui/core/view");
var page;

var page;

exports.pageloaded = function (args) {
    page = args.object;

    const context = page.navigationContext;

    var bindingObj = {
        movie: context
    };

    if (context != undefined ) {
        page.bindingContext = bindingObj;
    }
}