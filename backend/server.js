const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text });
  await task.save();
  res.json(task);
});

// Toggle task done
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.done = !task.done;
  await task.save();
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
