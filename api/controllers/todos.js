const Todo = require("../models/Todo")

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({});
    res.status(201).json(todos);
}

const createTodo = (req, res) => {
    const todo = new Todo({
        text: req.body.text
      });
    
      todo.save()
    
      res.status(201).json(todo);
}

const deleteTodo = async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
}

const completeTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id)
  
    todo.completed = !todo.completed
  
    todo.save()
  
    res.status(200).json(todo)
}

module.exports = {getAllTodos, createTodo, deleteTodo, completeTodo}