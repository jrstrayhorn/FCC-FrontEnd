$(document).ready(function() {
    // register click events
    $("#quote-button").on("click", function() {
        LoadQuote();
    });

    // perform initial load of quote
    LoadQuote();
});

function LoadQuote() {
    $.get("http://api.chrisvalleskey.com/fillerama/get.php?count=1&format=json&show=starwars&jsoncallback=?", function(response) {

        var source = response.db[0].source;
        var quote = response.db[0].quote;
        var html = "";
        var author = (source ? source : "Unknown");
        html += "<h2>" + author + " said..</h2>";
        html += "<div class='component'>";
        html += "<div class='alert " + getRandomAlertClass() + "'>";
        html += '<h4>"' + quote + '"</h4>';
        html += "<p>- <a href='http://fillerama.io/' class='alert-link'>See the quote at Fillerama</a></p>";
        html += "</div>";
        html += "</div>";
        $(".quote-section").html(html);

        // updating href for twitter button
        var fullQuote = '"' + quote + '" - ' + author;
        var encodeQuote = encodeURIComponent(fullQuote.trim());
        var twitterURL = "https://twitter.com/intent/tweet?text=";
        $("#tweet-button").attr("href",twitterURL + encodeQuote);

    }, "jsonp");
}

function getRandomAlertClass() {
    var classArr = ["alert-success","alert-warning","alert-danger","alert-info"];
    return classArr[getRandomNumber()];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4);
}