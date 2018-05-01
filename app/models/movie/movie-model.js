var observableModule = require("data/observable");

function MovieModel(
    upc = 0, 
    productName = "", 
    manufacturer = "",
    longDescription = "",
    image = "",
    year = "", 
    rated = "",
    imdbRating = "",
    released = "",
    runtime = "",
    genre = "",
    director = "",
    writer = "",
    language = "") {
    var viewModel = observableModule.fromObject({
        upc: upc,
        productName: productName,
        manufacturer: manufacturer,
        longDescription: longDescription,
        image: image,
        year: year, 
        rated: rated,
        rating: imdbRating,
        release: released,
        time: runtime, 
        genre: genre,
        director: director, 
        writers: writer, 
        language: language
    });

    return viewModel;
}

module.exports = MovieModel;