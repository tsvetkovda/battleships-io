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

io.on("connection", function(socket) {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", function() {
        console.log("Socket disconnected:", socket.id);
    });

    socket.on("createRoom", ({ username, roomId }) => {
        room = createdRooms.find(x => x.id === roomId);

        if (!room) {
            createdRooms.push({
                id: roomId,
                users: [username],
            });

            io.to(`${socket.id}`).emit("roomCreation", {
                canCreate: true,
                msg: "Success",
            });

            console.log(createdRooms);

            socket.join(roomId);
        }

        if (room) {
            io.to(`${socket.id}`).emit("roomCreation", {
                canCreate: false,
                msg: "Room with this id is already created",
            });
        }
    });

    socket.on("joinRoom", ({ username, roomId }) => {
        room = createdRooms.find(x => x.id === roomId);

        if (!room) {
            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: false,
                msg: "Room not found",
            });
        }

        if (room && room.users.length > 1) {
            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: false,
                msg: "Room is full",
            });
        }

        if (room && room.users.length < 2) {
            room.users.push(username);

            socket.join(roomId);

            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: true,
                msg: "Success",
            });

            console.log(createdRooms);

            setTimeout(() => io.emit("allPlayersConnected"), 1500);
        }
    });

    socket.on("sendDataToOpponent", data => {
        console.log(data);
        socket.broadcast.emit("sendDataToOpponent", data);
    });

    socket.on("sendShot", data => {
        console.log(data);
        socket.broadcast.emit("sendShot", data);
    });

    socket.on("chatMsg", (msg, username) => {
        io.emit("chatMsg", msg, username);
    });
});

server.listen(port, () => {
    console.log("Server listening at port:", port);
});
