var observableModule = require("data/observable");

function BarcodeModel(
    upc = 0, 
    productName = "", 
    manufacturer = "",
    longDescription = "",
    image = "") {
    var viewModel = observableModule.fromObject({
        upc: upc,
        productName: productName,
        manufacturer: manufacturer,
        longDescription: longDescription,
        image: image
    });

    return viewModel;
}

module.exports = BarcodeModel;