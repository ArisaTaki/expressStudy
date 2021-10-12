const express = require("express");
const router = require('./router')

const port = 3001;
const app = express();

// 配置解析表单请求体: application/json
app.use(express.json());
// 配置解析表单请求体: application/x-www-form-urlencoded
app.use(express.urlencoded());

// 挂载路由
// 给理由限定访问前缀:以后访问接口都必须有个前缀路由/todos
app.use('/todos', router)

// 通常在所有的路由之后配置处理404
// 请求进来从上到下依次匹配
app.use((req, res, next) => {
  res.status(404).send('404 Not Found')
})

// 在所有的中间件之后挂载错误处理的中间件
app.use((err, req, res, next) => {
  // 这中间件的四个参数缺一不可
  console.log('错误:', err)
  res.status(500).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
