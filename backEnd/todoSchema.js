import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todoData: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model('Todo', todoSchema);
