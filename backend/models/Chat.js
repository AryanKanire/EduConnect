const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderModel"  // 🔥 Dynamically refers to "Teacher" or "Student"
  },
  senderModel: {
    type: String,
    required: true,
    enum: ["Teacher", "Student"]  // 🔥 Allowed values
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "receiverModel"  // 🔥 Dynamically refers to "Teacher" or "Student"
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ["Teacher", "Student"]
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Chat', chatSchema);
