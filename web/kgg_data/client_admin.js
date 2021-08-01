// Function for getting client IP.
$.ajax({
    type: "GET",
    url: "https://konalt.us.to/api/ip",
    success: function(response) {
        return response.ip;
    }
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
        case "mobile":
            $("#state_mobile").removeClass("hidden-state");
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
// URL Params, for debug options.
var params = new URLSearchParams(window.location.search);

// This function is for the future, when we'll have splash text
// Yes, this is deprecated. No, I don't care.
function getRandomSplash() {
    // Have to do this for some reason
    var toReturn = "Splash text error 0";
    $.ajax({
        type: "GET",
        url: "kgg_data/splashes_admin.json",
        async: false,
        dataType: "json",
        success: function(response) {
            console.log("Got splash texts epicly");
            // Choose random one and return it.
            var splash = response.splashes[Math.floor(Math.random() * response.splashes.length)].replace("__IPADDR__", "");
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
function setSplashText(forceDev) {
    if (forceDev == 1) {
        var splash = "<img src=\"dev.png\" alt=\"dev\"/ class=\"dev\">";
        $("#splash").html(splash);
        return splash;
    } else if (forceDev == 2) {
        var splash = "<img src=\"aids.png\" alt=\"discord moment\"/ class=\"dev\">";
        $("#splash").html(splash);
        return splash;
    } else {
        var splash = getRandomSplash();
        $("#splash").html(splash);
        return splash;
    }
}

function initConnection() {
    // Connect to Socket.IO server
    var socket = io.connect("https://konalt.us.to:22649");
    // On connection acknowledgement event, log it to console. I'll deal with it later
    socket.on("connection_ack", () => {
        console.log("Connected to server!");
        // Add an extra 2 seconds to the connect screen
        // I put lots of effort in, okay?
        setTimeout(() => {
            state("game");
        }, 2000);
    });
    setSplashText();
}

// Before anybody does anything, check if it's a mobile browser.
// Thanks to https://stackoverflow.com/a/11381730 for the function
function isMobile() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
if (isMobile() || params.get("forcemobile") == "true") {
    // On mobile browser, show "Sorry :(" page
    state("mobile");
    // Update mobile info
    $("#mobinfo").html("UserAgent: " + navigator.userAgent + "<br><br>Forced Display: " + (params.get("forcemobile") == "true" ? "FORCED" : "NOT_FORCED"));
} else {
    initConnection();
}