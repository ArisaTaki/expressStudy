const express = require('express')
const morgan = require('morgan')

const port = 3001
const app = express()

// 第三方中间件，官方把功能性的中间件以包的形式单独提供出来，保持了express的灵活特性，可以灵活使用
// 第三方中间件的功能部分列表参考：http://expressjs.com/en/resources/middleware.html
// 以打印日志的工具morgan为例子

// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})