import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { fetchTodos, updateTodo, deleteTodo } from '../Components/services/Api.js';

function TodoList() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    const getTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    getTodos();
  }, []);

  // Update a todo
  const handleUpdateTodoData = async (id, updatedData) => {
    try {
      // Update the local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, ...updatedData } : todo))
      );

      // Save the updated data to the backend
      const updatedTodo = await updateTodo(id, updatedData);
      
      // Update the state again with the response to ensure it's in sync with the database
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Failed to delete the todo:', error);
    }
  };

  // Toggle edit mode
  const toggleEditTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isEditable: !todo.isEditable } : todo
      )
    );
  };

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          list={todo}
          deleteTodo={handleDeleteTodo}
          updateTodoData={handleUpdateTodoData}
          toggleEditTodo={toggleEditTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;