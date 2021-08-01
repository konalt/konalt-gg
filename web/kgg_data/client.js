// Connect to Socket.IO server
var socket = io.connect("https://konalt.us.to:22649");
// On connection acknowledgement event, log it to console. I'll deal with it later
socket.on("connection_ack", () => {
    console.log("Connected to server!");
});

// Function for changing states.
function state(stateID) {
    $('#states').children().each(function() {
        $(this).addClass("hidden-state");
    });
    switch (stateID) {
        case "con":
            $("#state_connecting").removeClass("hidden-state");
            break;
        case "game":
            $("#state_play").removeClass("hidden-state");
            break;
        case "admin":
            $("#admin_state").removeClass("hidden-state");
            break;
        default:
            break;
    }
}

// This function is for the future, when we'll have splash text
// Yes, this is deprecated. No, I don't care.
function getRandomSplash() {
    // Have to do this for some reason
    var toReturn = "Splash text error 0";
    $.ajax({
        type: "GET",
        url: "kgg_data/splashes.json",
        async: false,
        dataType: "json",
        success: function(response) {
            console.log("Got splash texts epicly");
            // Choose random one and return it.
            var splash = response.splashes[Math.floor(Math.random() * response.splashes.length)];
            toReturn = splash;
        },
        error: function() {
            console.log("Couldn't get splash texts?????");
            toReturn = "Splash text error 1";
        }
    });
    return toReturn;
}

// Function for applying a random splash to the bouncy splash display
function setSplashText() {
    var splash = getRandomSplash();
    $("#splash").html(splash);
    return splash;
}
setSplashText();