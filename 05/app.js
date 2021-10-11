const express = require("express");
const fs = require("fs");
const { getDb } = require("./db");
const port = 3001;
const app = express();

app.get("/todos", async (req, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db.todos);
  } catch {
    res.status(500).json({
      error: err.message,
    });
  }
});

// req.params.xxx(属性)获取路径参数
// req.query获取的是?这一类的query参数
app.get("/todos/:id", async (req, res) => {
  try {
    const db = await getDb();
    const todo = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );
    console.log(todo);
    if (!todo) {
      return res.status(404).end();
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/todos", (req, res) => {
  res.send("post /todos");
});

app.patch("/todos/:id", (req, res) => {
  res.send("patch /todos");
});

app.delete("/todos/:id", (req, res) => {
  res.send(`delete /todos/${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
