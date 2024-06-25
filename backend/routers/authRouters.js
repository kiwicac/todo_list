const cors = require("cors");
const express = require("express");
const router = express.Router();
const {
  showAll,
  postNewTodo,
  updateTodo,
  deleteTodo,
  getTodo
} = require("../controllers/authControllers");

router.use(
  cors({
    origin: "http://localhost:5173",
  })
);

router.get("/", showAll);
router.post("/", postNewTodo);
router.patch("/", updateTodo);
router.delete("/details/:id", deleteTodo);
router.get("/details/:id", getTodo);

module.exports = router;
