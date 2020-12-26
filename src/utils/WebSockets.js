const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Connected: ' + socket.id);

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.id);
    });

    socket.on('joinRoom', (chatroomId) => {
      socket.join(chatroomId);
    });

    socket.on('leaveRoom', (chatroomId) => {
      socket.leave(chatroomId);
    });

    socket.on('chatroomMessage', async (chatroomId, message, user) => {
      io.to(chatroomId).emit('newMessage', message, user);
    });
  });
};

export default socketEvents;
