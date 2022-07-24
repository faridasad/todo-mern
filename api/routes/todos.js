const express = require("express")
const router = express.Router()
const {getAllTodos, createTodo, deleteTodo, completeTodo} = require("../controllers/todos")


router.route("/").get(getAllTodos)
router.route("/new").post(createTodo)
router.route("/delete/:id").delete(deleteTodo)
router.route("/complete/:id").put(completeTodo)

module.exports = router