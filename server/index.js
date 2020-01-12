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
        room = createdRooms.find(x => x.id === roomId);

        if (room) {
            io.to(`${socket.id}`).emit("roomCreation", {
                canCreate: false,
                msg: "Room with this id is already created",
            });
            return;
        }

        if (users.some(x => x.name === username)) {
            io.to(`${socket.id}`).emit("roomCreation", {
                canCreate: false,
                msg: "There is user with this name",
            });
            return;
        }

        if (!room) {
            createdRooms.push({
                id: roomId,
                users: [username],
            });

            users.push({ id: socket.id, name: username });

            io.to(`${socket.id}`).emit("roomCreation", {
                canCreate: true,
                msg: "Success",
            });

            io.emit("chatMsg", { username: "INFO", msg: `Room ${roomId} created!` });

            socket.join(roomId);
        }
    });

    socket.on("joinRoom", ({ username, roomId }) => {
        room = createdRooms.find(x => x.id === roomId);

        if (!room) {
            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: false,
                msg: "Room not found",
            });
            return;
        }

        if (users.some(x => x.name === username)) {
            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: false,
                msg: "There is user with this name",
            });
            return;
        }

        if (room && room.users.length > 1) {
            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: false,
                msg: "Room is full",
            });
        }

        if (room && room.users.length < 2) {
            room.users.push(username);

            users.push({ id: socket.id, name: username });

            socket.join(roomId);

            io.to(`${socket.id}`).emit("playerConnection", {
                canConnect: true,
                msg: "Success",
            });

            socket.broadcast.emit("chatMsg", {
                username: "INFO",
                msg: `User ${username} connected!`,
            });

            console.log(createdRooms);

            let firstPlayer = room.users[defineFirstTurn()];

            setTimeout(() => io.emit("allPlayersConnected"), 1500);

            setTimeout(() => io.emit("defineFirstTurn", firstPlayer), 1500);
        }
    });

    socket.on("playerLeft", data => {
        socket.leave(data.roomId);
    });

    socket.on("sendDataToOpponent", data => {
        socket.broadcast.emit("sendDataToOpponent", data);
    });

    socket.on("sendShot", data => {
        socket.broadcast.emit("sendShot", data);
    });

    socket.on("chatMsg", data => {
        io.emit("chatMsg", data);
    });
});

server.listen(port, () => {
    console.log("Server listening at port:", port);
});

function defineFirstTurn() {
    return Math.round(Math.random());
}
