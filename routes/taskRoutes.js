const express = require("express");
const Task = require("../models/Task");
const mongoose = require("mongoose");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     operationId: getAllTasks
 *     description: Fetches all tasks from the database.
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", async (req, res) => {
    try {
        console.log("📡 GET /tasks - Fetching all tasks");
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error("❌ Error fetching tasks:", err);
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     operationId: createTask
 *     description: Adds a new task to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/", async (req, res) => {
    try {
        console.log("📥 POST /tasks - Incoming request:", req.body);
        if (!req.body.title) {
            return res.status(400).json({ error: "Task title is required" });
        }
        const newTask = new Task({
            title: req.body.title,
            completed: req.body.completed || false,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error("❌ Error adding task:", err);
        res.status(400).json({ message: "Error adding task", error: err.message });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     operationId: updateTask
 *     description: Updates the status or title of a task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.put("/:id", async (req, res) => {
    try {
        console.log(`✏️ PUT /tasks/${req.params.id} - Updating task`, req.body);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    } catch (err) {
        console.error("❌ Error updating task:", err);
        res.status(400).json({ message: "Error updating task", error: err.message });
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     operationId: deleteTask
 *     description: Removes a task from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", async (req, res) => {
    try {
        console.log(`🗑️ DELETE /tasks/${req.params.id} - Deleting task`);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting task:", err);
        res.status(400).json({ message: "Error deleting task", error: err.message });
    }
});

module.exports = router;
