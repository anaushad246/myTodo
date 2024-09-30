import express from 'express';
import mongoose from 'mongoose';
import { Todo } from './todoSchema.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myTodo")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.error('MongoDB connection error:', error));

// Get all todos
app.get('/', async (req, res) => {
  try {
    const data = await Todo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

// Add a new todo
app.post('/myTodo', async (req, res) => {
  try {
    const { todoData } = req.body;
    const todo = new Todo({ todoData });
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error adding todo' });
  }
});

// Delete a todo
app.delete('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Todo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ message: 'Task deleted successfully.', task });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

// Update a todo
app.put('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const task = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
});

app.listen(3010, () => {
  console.log("Server is running on port 3010");
});
