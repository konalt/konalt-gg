// Konalt GG server code

// Require some files
const fs = require("fs");
const https = require("https");
const sio = require("socket.io");
const express = require("express");

// Grab the config
const config = JSON.parse(fs.readFileSync("./serverconfig.json").toString());

// HTTPS certificates. No, you can't have them.
const options = {
    key: fs.readFileSync('C:\\Certbot\\live\\konalt.us.to\\privkey.pem'),
    cert: fs.readFileSync('C:\\Certbot\\live\\konalt.us.to\\fullchain.pem')
};

// Actually make the server
const app = express();
const server = https.createServer(options, app);
const io = sio(server);

// Server listens on config.port OR if -port is included, use that
var usingPort = process.argv.includes("-port") ? process.argv[process.argv.indexOf("-port") + 1] : config.port
server.listen(usingPort);
console.log(`Server listening on port ${usingPort}`);

// Socket.io code
io.on("connection", (socket) => {
    console.log(`Client ${socket.id.substr(0,4)} connected.`);
    socket.emit("connection_ack");
});