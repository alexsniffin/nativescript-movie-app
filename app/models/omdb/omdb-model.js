var observableModule = require("data/observable");

function OmdbModel(
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
        year: year, 
        rated: rated,
        rating: imdbRating,
        release: released,
        time: runtime, 
        genre: genre,
        director: director, 
        writers: writer, 
        language: language,
    });

    return viewModel;
}

module.exports = OmdbModel;