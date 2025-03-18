const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

// Export the model, preventing re-compilation issues
module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
