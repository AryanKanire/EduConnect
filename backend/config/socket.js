const socketIo = require("socket.io");
const Chat = require("../models/chatModel");

const setupSocket = (server) => {
    const io = socketIo(server, { cors: { origin: "*" } });

    // ✅ Store userID → socketID mapping
    const userSocketMap = new Map();
    io.userSocketMap = userSocketMap; // Store globally for controllers

    io.on("connection", (socket) => {
        console.log("✅ User connected:", socket.id);

        // ✅ When user joins, store their socket ID
        socket.on("join", ({ userId }) => {
            userSocketMap.set(userId, socket.id);
            console.log(`👤 User ${userId} is now online`);
        });

        // ✅ Handle message sending (Only for WebSocket-based messages)
        socket.on("sendMessage", async (data) => {
            const { sender, senderModel, receiver, receiverModel, message } = data;

            try {
                // ✅ Store message in DB (ONLY FOR SOCKET USERS)
                const newMessage = new Chat({ sender, senderModel, receiver, receiverModel, message });
                await newMessage.save();

                // ✅ Emit to receiver if online
                const receiverSocket = userSocketMap.get(receiver);
                if (receiverSocket) {
                    io.to(receiverSocket).emit("newMessage", newMessage);
                }

            } catch (error) {
                console.error("❌ Error saving message:", error);
            }
        });

        // ✅ Handle user disconnection
        socket.on("disconnect", () => {
            for (const [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    console.log(`🚪 User ${userId} disconnected.`);
                    break;
                }
            }
        });
    });

    return io;
};

module.exports = setupSocket;
