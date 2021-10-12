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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
