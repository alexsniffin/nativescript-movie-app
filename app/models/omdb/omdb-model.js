function OmdbModel(
    year = "", 
    rated = "",
    rating = "",
    release = "",
    time = "",
    genre = "",
    director = "",
    writers = "",
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