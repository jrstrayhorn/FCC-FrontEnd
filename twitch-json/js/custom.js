var html = "";

var userArray = ["ESL_SC2", "OgamingSC2", "freecodecamp", "noobs2ninjas", "comster404", "brunofin", "eleaguetv"]; 

$(document).ready(function() {
   checkUser(0);
});

function checkUser(i) {
    if (i < userArray.length) {
        var user = userArray[i];
        $.get("https://wind-bow.gomix.me/twitch-api/streams/" + user , function(response) {
            var myResponse = response;
            if (myResponse.stream) {
                html += GetOnlineHTML(myResponse.stream.channel.display_name, myResponse.stream.channel.url, myResponse.stream.channel.status);
                $(".twitch-results").html(html);
                checkUser(i+1);
            }
            else {
                // check if user exists
                $.get("https://wind-bow.gomix.me/twitch-api/users/" + user, function(userResponse) {
                    var myUserResponse = userResponse;
                    if (!myUserResponse.error) {
                        html += GetOfflineHTML(myUserResponse.display_name, myUserResponse.name);
                    }
                    else {
                        html += GetNotFoundHTML(user);
                    }
                    $(".twitch-results").html(html);
                    checkUser(i+1);
                }, "jsonp");
            }
        }, "jsonp");
    }
}

function GetOnlineHTML(displayName, url, channelStatus) {
    var returnHTML = "";
    returnHTML += "<div class='alert alert-success' role='alert'>";
    returnHTML += "<strong>" + displayName + "</strong> is <a href='" + url + "' class='alert-link' target='_blank'>ONLINE (click here to view)</a>";
    returnHTML += " streaming '" + channelStatus + "'";
    returnHTML += "</div>";
    return returnHTML;
}

function GetOfflineHTML(displayName, name) {
    var returnHTML = "";
    returnHTML += "<div class='alert alert-warning' role='alert'>";
    returnHTML += "<strong>" + displayName + "</strong> is <a href='https://www.twitch.tv/" + name + "' class='alert-link' target='_blank'>OFFLINE (click here to view channel)</a>";
    returnHTML += "</div>";
    return returnHTML;
}

function  GetNotFoundHTML(userName) {
    var returnHTML = "";
    returnHTML += "<div class='alert alert-danger' role='alert'>";
    returnHTML += "<strong>" + userName + "</strong> does not exist.";
    returnHTML += "</div>";
    return returnHTML;
}

  