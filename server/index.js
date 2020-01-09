var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var port = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

let createdRooms = [];
let users = [];

io.on("connection", function(socket) {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", function() {
        console.log("Socket disconnected:", socket.id);
    });

    socket.on("createRoom", ({ username, roomId }) => {
        socket.join(roomId);

        createdRooms.push({
            id: roomId,
            users: [username],
        });
    });

    socket.on("joinRoom", ({ username, roomId }) => {
        room = createdRooms.find(x => x.id === roomId);

        if (room && room.users.length < 2) {
            socket.join(roomId);

            room.users.push(username);
        }

        if (room.users.length === 2) {
            setTimeout(() => io.emit("allPlayersConnected"), 5000);
        }
    });

    socket.on("sendDataToOpponent", data => {
        console.log(data);
        socket.broadcast.emit("sendDataToOpponent", data);
    });

    socket.on("chatMsg", (msg, username) => {
        io.emit("chatMsg", msg, username);
    });
});

server.listen(port, () => {
    console.log("Server listening at port:", port);
});
