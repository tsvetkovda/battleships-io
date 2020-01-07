var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var port = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    socket.on("addUser", username => {
        console.log("new user is:", username);
    });
});

server.listen(port, () => {
    console.log("Server listening at port:", port);
});
