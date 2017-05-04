var html = "";

var userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"]; 

$(document).ready(function() {
    
   checkUser(0);

});

function checkUser(i) {
    if (i < userArray.length) {
        var user = userArray[i];
        $.get("https://wind-bow.gomix.me/twitch-api/streams/" + 
                user , function(response) {

                    var myResponse = response;

    if (myResponse.stream) {
        html += "<div class='alert alert-success' role='alert'>";
            html += "<strong>" + myResponse.stream.channel.display_name + "</strong> is <a href='" + myResponse.stream.channel.url + "' class='alert-link' target='_blank'>ONLINE (click here to view)</a>";
            html += " streaming '" + myResponse.stream.channel.status + "'";
        html += "</div>";
        $(".twitch-results").html(html);
        checkUser(i+1);
    }
    else {
        // check if user exists
        $.get("https://wind-bow.gomix.me/twitch-api/users/" + user, function(userResponse) {
            var myUserResponse = userResponse;
        if (!myUserResponse.error) {
            html += "<div class='alert alert-warning' role='alert'>";
            html += "<strong>" + myUserResponse.display_name + "</strong> is OFFLINE";
                html += "</div>";
        } else {
            html += "<div class='alert alert-danger' role='alert'>";
            html += "<strong>" + user + "</strong> does not exist.";
                html += "</div>";
        }
        $(".twitch-results").html(html);
        checkUser(i+1);
        }, "jsonp");
        
    }

            }, "jsonp");
    }
}

  