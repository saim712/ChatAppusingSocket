const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Handling socket connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Handle user joining the chat
  socket.on('userJoined', (username) => {
    io.emit('userJoined', username);  // Broadcast that a new user has joined
  });

  // Listening for chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);  // Broadcast the message to all connected users
  });

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Starting the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
