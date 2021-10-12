const express = require('express')

const port = 3001
const app = express()
// 内置中间件
// express具有以下的内置中间件函数：

// 1.解析Content-Type为application/json格式的请求体
express.json()

// 2.解析Content-Type为application/x-www-form-urlencoded格式的请求体
express.urlencoded()

// 3.解析Content-Type为application/octet-stream格式的请求体
express.raw()

// 4.解析Content-Type为application/plain格式的请求体
express.text()

// 5.托管静态资源文件
express.static()

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})