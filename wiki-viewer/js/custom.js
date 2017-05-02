$(document).ready(function() {
    
    $("#search").click(function() {
       
        var searchTerm = $("#searchTerm").val();

        if (!searchTerm)
        {
          alert("Please enter a search term.");
          return;
        }

        var searchTermTrim = searchTerm.trim();
        if (searchTerm.trim().length == 0)
        {
          alert("Please enter a search term.");
          return;
        }

        $.get("http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" + 
              searchTermTrim + "&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max", function(response) {

            var html = "";

            var pages = response.query.pages;
            for (var page in pages) {
                if (pages.hasOwnProperty(page)) {
                    //console.log(page + " -> " + pages[page].title + ", " + pages[page].extract + ", " + pages[page].pageid);
                    html += "<div class='panel panel-primary'>";
                    html += "<div class='panel-heading'>";
                    html += "<h3 class='panel-title'>" + pages[page].title + "</h3>";
                    html += "</div>"
                    html += "<div class='panel-body'>";
                    html += "<span class='description'>" + pages[page].extract + "</span>"; 
                    html += "<a class='btn btn-info btn-sm' href='https://en.wikipedia.org/?curid=" + pages[page].pageid + "' target='_blank'>View Wiki</a>";
                    html += "</div>";
                    html += "</div>";
                }
            }

            $(".results").html(html);

        }, "jsonp");
    });
});