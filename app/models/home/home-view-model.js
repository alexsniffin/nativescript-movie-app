var frameModule = require("ui/frame");

function HomeViewModel() {
    var viewModel =
        [
            {
                year: 1986,
                description: "Enterprise Crew travels back to 1980s to save the whales",
                id: "StarTrekIV",
                img: "~/views/images/StarTrekIV.jpg",
                name: "Star Trek IV"
            },
            {
                year: 1977,
                description: "Episode IV: A New Hope",
                id: "StarWars",
                img: "~/views/images/StarWars.jpg",
                name: "Star Wars"
            },
            {
                year: 2000,
                description: "The spider man origins story",
                id: "SpiderMan",
                img: "~/views/images/SpiderMan.jpg",
                name: "Spider Man"
            },
            {
                year: 2011,
                description: "Earths mightiest heroes unite!",
                id: "TheAvengers",
                img: "~/views/images/TheAvengers.jpg",
                name: "The Avengers"
            },
            {
                year: 1990,
                description: "Irish soul band story",
                id: "TheCommitments",
                img: "~/views/images/TheCommitments.jpg",
                name: "The Commitments"
            },
            {
                year: 1973,
                description: "Modern day comedy on an old story.",
                id: "YoungFrankenstein",
                img: "~/views/images/YoungFrankenstein.jpg",
                name: "Young Frankenstein"
            },
            {
                year: 1976,
                description: "American mafia story",
                id: "Godfather",
                img: "~/views/images/godfather.jpg",
                name: "The Godfather"
            },
            {
                year: 1976,
                description: "Scariest Movie Ever!",
                id: "Halloween",
                img: "~/views/images/halloween.jpg",
                name: "Halloween"
            },
            {
                year: 2016,
                description: "A Star Wars Story.",
                id: "Rogue One",
                img: "~/views/images/rogue_one.jpg",
                name: "Rogue One"
            },
            {
                year: 1990,
                description: "Classic boy meets girl romantic comedy ",
                id: "WhenHarryMetSally",
                img: "~/views/images/when_harry_met_sally.jpg",
                name: "When Harry Met Sally"
            }
        ]
    return viewModel;
};
module.exports = HomeViewModel;