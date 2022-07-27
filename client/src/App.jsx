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
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-600">
      <div className="flex justify-center items-center flex-col gap-5">
        <form className="w-full flex items-center justify-between gap-3 sm:gap-5" onSubmit={(e) => addTodo(e)}>
          <input
            className="flex-3 py-2 px-5 border-radius rounded-md outline-none w-44 sm:w-96"
            type="text"
            value={todo}
            placeholder="Add Task"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="cursor-pointer inline-block px-2 py-3 sm:px-5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out" type="submit" disabled={!todo}>
            {" "}
            add Todo{" "}
          </button>
        </form>
        <div className="w-full">
          <ul className="flex items-center justify-around flex-col gap-4">
            {todos.map((todo) => (
              <div className="flex items-center justify-between w-full px-4 py-2 bg-zinc-900 hover:bg-zinc-800 transition duration-250 ease-in-out rounded-md text-zinc-50 cursor-pointer select-none" key={todo._id}>
                <li className="w-full"
                  onClick={() => completeTodo(todo._id)}
                >
                  <p className={todo.completed ? "line-through" : ""}>{todo.text}</p>{" "}
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
