// Connect to Socket.IO server
var socket = io.connect("https://konalt.us.to:22649");
// On connection acknowledgement event, log it to console. I'll deal with it later
socket.on("connection_ack", () => {
    console.log("Connected to server!");
});

// This function is for the future, when we'll have splash text
function getRandomSplash() {
    $.ajax({
        type: "GET",
        url: "kgg_data/splashes.json",
        dataType: "json",
        success: function(response) {
            console.log("Got splash texts epicly");
            // Choose random one and return it.
            var splash = response.splashes[Math.floor(Math.random() * response.splashes.length)];
            return splash;
        },
        error: function() {
            console.log("Couldn't get splash texts?????");
        }
    });
}