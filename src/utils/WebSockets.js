const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Connected: ' + socket.id);

    socket.on('disconnect', () => {
      console.log('Disconnected: ' + socket.id);
    });

    socket.on('joinRoom', (chatroomId) => {
      socket.join(chatroomId);
      console.log('A user joined chatroom: ' + chatroomId);
    });

    socket.on('leaveRoom', (chatroomId) => {
      socket.leave(chatroomId);
      console.log('A user left chatroom: ' + chatroomId);
    });

    socket.on('chatroomMessage', async ({ chatroomId, message }) => {
      console.log(message);
      io.to(chatroomId).emit('newMessage', {
        message,
      });
    });
  });
};

export default socketEvents;
