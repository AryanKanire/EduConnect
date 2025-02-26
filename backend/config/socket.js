const socketIo = require('socket.io');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: { origin: "*" }
    });

    io.on('connection', (socket) => {
        console.log("User connected:", socket.id);

        socket.on('sendMessage', (data) => {
            io.to(data.receiverId).emit('receiveMessage', data);
        });

        socket.on('disconnect', () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = setupSocket;
