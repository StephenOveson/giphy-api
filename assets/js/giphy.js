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
let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=z7RPLbJykv68026AD6lRTzuLiLERSaOX&limit=10";



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
            button.addClass('btn btn-info')
            button.attr('data-name', gifTopic[x])
            button.text(gifTopic[x])
            topButtons.append(button)
        }
    }
})