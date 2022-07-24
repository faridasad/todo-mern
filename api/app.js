const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const todos = require("./routes/todos")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/todos", todos)

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
