import React, { useState, useEffect } from "react";
import axios from "axios"
import "./App.css";

const URL_BASE = "http://localhost:8000";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    await axios.get(URL_BASE + "/todos").then(res => setTodos(res.data))
  };

  const completeTodo = async (id) => {
    const result = await axios.put((URL_BASE + "/todos/complete/" + id))

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === result.data._id) {
          todo.completed = result.data.completed;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const res = await axios.delete(URL_BASE + "/todos/delete/" + id)

    setTodos((todos) => todos.filter((todo) => todo._id !== res.data._id));
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
              <div className="todo-item" key={todo._id}>
                <li
                  className={"todo-item" + (todo.completed ? " completed" : "")}
                  onClick={() => completeTodo(todo._id)}
                >
                  <p>{todo.text}</p>{" "}
                  
                </li>
                <span
                onClick={() => {
                  deleteTodo(todo._id);
                }}
              >
                X
              </span>
            </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
