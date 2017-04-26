$(document).ready(function() {
    // register click events
    $("#quote-button").on("click", function() {
        LoadQuote();
    });

    // perform initial load of quote
    LoadQuote();
});

function LoadQuote() {
    // using jsonp to avoid CORS
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(json) {
        var obj = JSON.parse(JSON.stringify(json));  // parsing returned json to object
        var html = "";
        var author = (obj.quoteAuthor ? obj.quoteAuthor : "Unknown");
        html += "<h2>" + author + " said..</h2>";
        html += "<div class='component'>";
        html += "<div class='alert " + getRandomAlertClass() + "'>";
        html += '<h4>"' + obj.quoteText + '"</h4>';
        html += "<p>- <a href='" + obj.quoteLink + "' class='alert-link'>See the quote at Forismatic.com</a></p>";
        html += "</div>";
        html += "</div>";
        $(".quote-section").html(html);

        // updating href for twitter button
        var fullQuote = '"' + obj.quoteText + '" - ' + author;
        var encodeQuote = encodeURIComponent(fullQuote.trim());
        var twitterURL = "https://twitter.com/intent/tweet?text=";
        $("#tweet-button").attr("href",twitterURL + encodeQuote);
    });
}

function getRandomAlertClass() {
    var classArr = ["alert-success","alert-warning","alert-danger","alert-info"];
    return classArr[getRandomNumber()];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4);
}