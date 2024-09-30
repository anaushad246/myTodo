import React from 'react';
import { useState } from 'react';
import './App.css';
import TodoList from './Components/TodoList';
import AddTodo from './Components/AddTodo/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  // Update list when a new todo is added
  const updateList = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <AddTodo updateList={updateList} />
      <TodoList />
    </>
  );
}

export default App;
