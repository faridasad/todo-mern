const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const Todo = require("./models/Todo");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.status(201).json(todos);
});

app.post("/todos/new", async (req, res) => {
  const todo = await Todo.create(req.body);

  res.status(201).json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todos/complete/:id", async (req, res) => {
  /* const todo = await Todo.findById(req.params.id)

  todo.completed = !todo.completed

  TOOOOOODDDDDDDDDOOOOOOOOOOO

  todo.save()

  res.status(200).json(todo) */
});

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port || 5000,
      console.log(`Listening on ${port}, Connected to DB`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();
