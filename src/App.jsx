import { useEffect, useState } from "react";

export default function App() {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);

  // Change state of todos on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevList) => {
      return [
        ...prevList,
        { id: crypto.randomUUID(), title: item, completed: false },
      ];
    });
  };

  // Toggle each todo when item is checked
  const toggleTodo = (id, checked) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: checked };
        } else {
          return todo;
        }
      })
    );
  };

  // Use for debugging
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item:</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
        </div>
        <button className="btn add-btn" type="submit">
          Add
        </button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul className="item-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(event) => {
                    toggleTodo(todo.id, event.target.checked);
                  }}
                />
                {todo.title}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}