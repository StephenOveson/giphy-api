// z7RPLbJykv68026AD6lRTzuLiLERSaOX - API key for giphy usage
// create buttons that display at top of screen
// each button has a different search parameter
// clicking on buttons pulls up, up to 10 images
// clicking on an image will switch it to an animated gif
// each image will display rating either below or above itself
// include a search in column next to the display images/gifs
// when search is processed button is added to top amongst all other buttons
let gifTopic = [];
let topButtons = $('#topic-buttons');
let giphyDisplay = $('#giphy-display');
let giphySearch = $('#giphy-search');
let submit = $('#submit');
let searchTerm;
let gifStill;




// Button Generator
submit.on('click', function () {
    event.preventDefault();
    topButtons.empty();
    if ($('#new-giphy-search').val() === '') {
        return;
    } else {
        searchTerm = $('#new-giphy-search').val().trim();
        gifTopic.push(searchTerm)
        for (x = 0; x < gifTopic.length; x++) {
            $('#new-giphy-search').val("");
            let button = $('<button>');
            button.addClass('btn btn-info p-2 m-2 bd-highlight align-content-start flex-wrap')
            button.attr('id', 'giphy-find')
            button.attr('data-gif', gifTopic[x])
            button.on('click', giphyHunter)
            button.text(gifTopic[x])
            topButtons.append(button)
        }

    }
});

// Giphy Search using the buttons on click function handed them
function giphyHunter() {
    let search = $(this).attr('data-gif');
    console.log(search);
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=z7RPLbJykv68026AD6lRTzuLiLERSaOX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data;
        $("#giphy-display").empty();
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            gifStill = $("<img>");
            gifStill.attr("src", results[i].images.fixed_height_still.url);
            gifStill.attr('data-still', results[i].images.fixed_height_still.url)
            gifStill.attr('data-animate', results[i].images.original.url);
            gifStill.attr('data-state', 'still');
            gifStill.on('click', gifPlay)
            gifDiv.prepend(p);
            gifDiv.prepend(gifStill);
            $("#giphy-display").prepend(gifDiv);
        }

    })
}

function gifPlay() {
    let gifAnimate = $(this).attr('data-animate')
    let gifPause = $(this).attr('data-still')
    console.log(this)
    let state = $(this).attr("data-state")
    if (state === 'still') {
        $(this).attr("src", gifAnimate);
        $(this).attr("data-state", 'animate')
    } else {
        $(this).attr("src", gifPause);
        $(this).attr("data-state", 'still')
    }
}