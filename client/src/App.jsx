import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const URL_BASE = "http://localhost:8000";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(URL_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  const completeTodo = async (id) => {
    const result = await fetch(URL_BASE + "/todos/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === result._id) {
          todo.completed = result.completed;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(URL_BASE + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const data = await fetch(URL_BASE + "/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: todo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setTodo("");
  };

  return (
    <div className="App">
      <div className="wrapper">
        <form className="form-control" onSubmit={(e) => addTodo(e)}>
          <input
            type="text"
            value={todo}
            placeholder="Add Task"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" disabled={!todo}>
            {" "}
            add Todo{" "}
          </button>
        </form>
        <div className="todos-container">
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                className={"todo-item" + (todo.completed ? " completed" : "")}
                onClick={() => completeTodo(todo._id)}
                key={todo._id}
              >
                <p>{todo.text}</p>{" "}
                <span
                  onClick={() => {
                    deleteTodo(todo._id);
                  }}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
