import React, { useState } from 'react';
import { addNewTodo } from '../services/Api.js';

function AddTodo({ updateList }) {
  const [inputText, setInputText] = useState('');

  const handleAddTodo = async () => {
    if (inputText.trim() === "") return; // Prevent adding empty todos
    const newTodo = await addNewTodo(inputText);
    updateList(newTodo);
    setInputText("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        placeholder="Add your next todo"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
