const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Setup Routes (all prefixed with /api)
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Setup Socket.io
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Attach io instance to each request so controllers can use it
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io events handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join room based on a unique combination of sender and receiver IDs
  socket.on("joinRoom", ({ sender, receiver }) => {
    const roomId = [sender, receiver].sort().join("-");
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Listen for sendMessage events and broadcast them to the correct room
  socket.on("sendMessage", (data) => {
    // data: { sender, receiver, message }
    const roomId = [data.sender, data.receiver].sort().join("-");
    io.to(roomId).emit("newMessage", data);
    console.log(`Message from ${data.sender} to ${data.receiver}: ${data.message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
