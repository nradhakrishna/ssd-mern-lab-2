import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Todo from "./models/todoModel.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// GET all todos
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

// POST create todo
app.post("/api/todos", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }
  const todo = await Todo.create({ text });
  res.status(201).json(todo);
});

// PUT update todo
app.put("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.text = req.body.text ?? todo.text;
  todo.completed = req.body.completed ?? todo.completed;
  const updated = await todo.save();
  res.json(updated);
});

// DELETE todo
app.delete("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  await todo.deleteOne();
  res.json({ message: "Todo removed" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
