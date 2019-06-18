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




// Button Generator
submit.on('click', function () {
    event.preventDefault();
    searchTerm = $('#new-giphy-search').val().trim();
    gifTopic.push(searchTerm)
    topButtons.empty();
    if ($('#new-giphy-search').val() === '') {
        return;
    } else {
        for (x = 0; x < gifTopic.length; x++) {
            $('#new-giphy-search').val("");
            let button = $('<button>');
            button.addClass('btn btn-info p-2 m-2 bd-highlight align-content-start flex-wrap')
            button.attr('id', 'giphy-find')
            button.attr('data-gif', gifTopic[x])
            button.text(gifTopic[x])
            topButtons.append(button)
        }
    }
});

// Giphy Search using the buttons created on click and labels
let gifButtons = $('#giphy-find')
gifButtons.on('click', function () {
    let search = $(this).attr('data-gif').val().trim();
    console.log(search);
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=z7RPLbJykv68026AD6lRTzuLiLERSaOX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifStill = $("<img>");
            gifStill.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(gifStill);
            $("#giphy-display").prepend(gifDiv);
        }
    })

})