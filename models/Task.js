const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

// Ensure model is only compiled once
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

module.exports = Task;
