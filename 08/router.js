// 路由模块
const express = require('express')
const fs = require("fs");
const { getDb, saveDb } = require("./db");

// 创建路由实例
// 路由实例其实就相当于是一个mini express 实例
const router = express.Router()

// 配置路由

router.get("", async (req, res) => {
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
  router.get("/:id", async (req, res) => {
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
  
  router.post("", async (req, res) => {
    try {
      // 1. 获取客户端请求体参数
      const todo = req.body;
      // 2. 数据验证
      if (!todo.title) {
        return res.status(422).json({
          error: "Empty data, field title is required",
        });
      }
      // 3. 数据验证通过，数据存储到db中
      const db = await getDb();
  
      const lastTodo = db.todos[db.todos.length - 1];
      todo.id = lastTodo ? lastTodo.id + 1 : 1;
      db.todos.push(todo);
      await saveDb(db);
  
      // 4. 发送响应
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      // 1.获取到表单数据
      const todo = req.body
      // 2.查找到要修改的任务项
      const db = await getDb()
      const result = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
      if(!result) {
          return res.status(404).end()
      }
  
      // 把你提交的数据覆盖到查找到的数据上
      Object.assign(result, todo)
  
      await saveDb(db)
  
      res.status(200).json(result)
  
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
        const todoId = Number.parseInt(req.params.id)
        const db = await getDb()
        // 找到索引进行删除高效
        const index = db.todos.findIndex(todo => todo.id === todoId)
        if (index === -1) {
            res.status(404).end()
        }
        db.todos.splice(index, 1)
        await saveDb(db)
        res.status(204).end()
    } catch (err) {
      res.status(500).json({
          error: err.message
      })
    }
  });
  
router.get('/foo', (req, res) => {
    res.send('get /foo')
})

router.post('/foo', (req, res) => {
    res.send('post /foo')
})

// 导出路由实例
module.exports = router

// 将路由集成到express实例中