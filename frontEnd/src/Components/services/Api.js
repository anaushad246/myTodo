import axios from 'axios';

const API_URL = 'http://localhost:3010';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// Add a new todo
export const addNewTodo = async (todoData) => {
  const response = await axios.post(`${API_URL}/myTodo`, { todoData });
  return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/task/${id}`, updatedData);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/task/${id}`);
  return response.data;
};
