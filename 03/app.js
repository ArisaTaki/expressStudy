const express = require('express')

const app = express()
const port = 3001

app.get('/', (req, res) => {
    console.log(req.url) //请求地址
    console.log(req.method) //请求方法
    console.log(req.headers) //请求头
    //  请求路径里带有?xxx=xxx格式的，可以通过此接口获取到请求数据参数
    //  更多的可以通过文档进行自行查阅
    console.log('请求参数', req.query)
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})