const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

const createdRooms = [];

io.on('connection', function(socket) {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', function() {
    console.log('Socket disconnected:', socket.id);
  });

  socket.on('createRoom', ({ username, roomId }) => {
    const roomIdx = createdRooms.findIndex((x) => x.id === roomId);
    const room = createdRooms[roomIdx];

    if (room) {
      io.to(`${socket.id}`).emit('roomCreation', {
        canCreate: false,
        msg: 'Room with this id is already created',
      });
      return;
    }

    if (!room) {
      createdRooms.push({
        id: roomId,
        users: [username],
      });

      io.to(`${socket.id}`).emit('roomCreation', {
        canCreate: true,
        msg: 'Success',
      });

      io.emit('chatMsg', { username: 'INFO', msg: `Room ${roomId} created!` });

      socket.join(roomId);
    }
  });

  socket.on('joinRoom', ({ username, roomId }) => {
    const roomIdx = createdRooms.findIndex((x) => x.id === roomId);
    const room = createdRooms[roomIdx];

    if (!room) {
      io.to(`${socket.id}`).emit('playerConnection', {
        canConnect: false,
        msg: 'Room not found',
      });
      return;
    }

    if (room.users.some((x) => x === username)) {
      io.to(`${socket.id}`).emit('playerConnection', {
        canConnect: false,
        msg: 'There is user with this name',
      });
      return;
    }

    if (room && room.users.length > 1) {
      io.to(`${socket.id}`).emit('playerConnection', {
        canConnect: false,
        msg: 'Room is full',
      });
    }

    if (room && room.users.length < 2) {
      room.users.push(username);

      socket.join(roomId);

      io.to(`${socket.id}`).emit('playerConnection', {
        canConnect: true,
        msg: 'Success',
      });

      socket.broadcast.emit('chatMsg', {
        username: 'INFO',
        msg: `User ${username} connected!`,
      });

      const firstPlayer = room.users[defineFirstTurn()];

      setTimeout(() => io.emit('allPlayersConnected'), 1500);

      setTimeout(() => io.emit('defineFirstTurn', firstPlayer), 1500);
    }
  });

  socket.on('leaveRoom', (data) => {
    const roomIdx = createdRooms.findIndex((x) => x.id === data.roomId);
    const room = createdRooms[roomIdx];
    const userIdx = room.users.findIndex((x) => x === data.username);

    if (userIdx !== -1) {
      room.users.splice(userIdx, 1);
    }

    if (room.users.length < 1) {
      createdRooms.splice(roomIdx, 1);
    }

    socket.leave(data.roomId);

    socket.broadcast.emit('chatMsg', {
      username: 'INFO',
      msg: `User ${data.username} left!`,
    });

    socket.broadcast.emit('playerLeft');
  });

  socket.on('sendDataToOpponent', (data) => {
    socket.broadcast.emit('sendDataToOpponent', data);
  });

  socket.on('sendShot', (data) => {
    socket.broadcast.emit('sendShot', data);
  });

  socket.on('chatMsg', (data) => {
    io.emit('chatMsg', data);
  });
});

server.listen(port, () => {
  console.log('Server listening at port:', port);
});

const defineFirstTurn = () => Math.round(Math.random());
