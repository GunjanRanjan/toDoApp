import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [descriptionTodoId, setDescriptionTodoId] = useState(null);
  const [descriptionText, setDescriptionText] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: inputValue.trim(),
        description: "",
      };

      setTodos([newTodo, ...todos]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const openEditModal = (id, title) => {
    setEditTodoId(id);
    setEditTitle(title);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditTodoId(null);
    setEditTitle("");
  };

  const saveEdit = () => {
    if (editTitle.trim() !== "") {
      const todoToEdit = todos.find((todo) => todo.id === editTodoId);
      const otherTodos = todos.filter((todo) => todo.id !== editTodoId);

      const updatedTodo = {
        ...todoToEdit,
        title: editTitle.trim(),
      };

      setTodos([updatedTodo, ...otherTodos]);
      closeEditModal();
    }
  };

  const openDescriptionModal = (id, description) => {
    setDescriptionTodoId(id);
    setDescriptionText(description || "");
    setShowDescriptionModal(true);
  };

  const closeDescriptionModal = () => {
    setShowDescriptionModal(false);
    setDescriptionTodoId(null);
    setDescriptionText("");
  };

  const saveDescription = () => {
    const todoToEdit = todos.find((todo) => todo.id === descriptionTodoId);
    const otherTodos = todos.filter((todo) => todo.id !== descriptionTodoId);

    const updatedTodo = {
      ...todoToEdit,
      description: descriptionText.trim(),
    };

    setTodos([updatedTodo, ...otherTodos]);
    closeDescriptionModal();
  };

  const getFilteredTodos = () => {
    if (searchValue === "") {
      return todos;
    }

    const filtered = todos.filter((todo) => {
      const todoTitle = todo.title.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoTitle.includes(searchText);
    });

    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app">
      <div className="container">
        <h1>✍️ My Todo App📝</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="add-section">
          <input
            type="text"
            placeholder="Add a new todo title..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {searchValue
                ? "No todos match your search."
                : "No todos yet. Add one above!"}
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <span
                  className="todo-title"
                  onClick={() =>
                    openDescriptionModal(todo.id, todo.description)
                  }
                >
                  {todo.title}
                </span>
                <div className="button-group">
                  <button
                    onClick={() => openEditModal(todo.id, todo.title)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {showEditModal && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2>Edit Todo Title</h2>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit();
                  }
                }}
                className="modal-input"
                autoFocus
              />
              <div className="modal-buttons">
                <button onClick={saveEdit} className="save-btn">
                  Save
                </button>
                <button onClick={closeEditModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showDescriptionModal && (
          <div className="modal-overlay" onClick={closeDescriptionModal}>
            <div
              className="modal-box description-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Todo Description</h2>
              <textarea
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="description-textarea"
                placeholder="Write description here..."
                autoFocus
              />
              <div className="modal-buttons">
                <button onClick={saveDescription} className="save-btn">
                  Save
                </button>
                <button onClick={closeDescriptionModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
