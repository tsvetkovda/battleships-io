var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var port = 8000;

server.listen(port, () => {
    console.log("Server listening at port %d", port);
});

app.use(express.static("dist"));
