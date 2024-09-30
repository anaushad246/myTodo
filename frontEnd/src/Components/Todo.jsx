import React, { useState } from 'react';

function Todo({ list, deleteTodo, toggleEditTodo, updateTodoData }) {
  // Local state to manage the todo data temporarily
  const [tempTodoData, setTempTodoData] = useState(list.todoData);

  // Handle input change locally
  const handleEditChange = (e) => {
    setTempTodoData(e.target.value);
  };

  // Save changes when the "Save" button is clicked
  const handleSave = () => {
    updateTodoData(list._id, { todoData: tempTodoData }); // Update the backend only on save
    toggleEditTodo(list._id); // Exit edit mode
  };

  return (
    <div>
      <input
        type="checkbox"
        name="checkBox"
        id="checkBox"
        defaultChecked={list.isChecked}
      />
      <input
        type="text"
        value={tempTodoData}
        name="todoDataField"
        id="todoDataField"
        onChange={handleEditChange}
        readOnly={!list.isEditable} // Editable only when in edit mode
      />

      <button onClick={() => (list.isEditable ? handleSave() : toggleEditTodo(list._id))}>
        {list.isEditable ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => deleteTodo(list._id)}>Delete</button>
    </div>
  );
}

export default Todo;
