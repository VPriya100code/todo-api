const mongoose = require("mongoose");
const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* GET tasks */
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

/* ADD task */
router.post("/", auth, async (req, res) => {
  try {
  const task = new Task({
  title: req.body.title,
  user: req.user   
});

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* DELETE task */
router.delete("/:id", auth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user });
  res.json({ message: "Deleted" });
});

module.exports = router;
