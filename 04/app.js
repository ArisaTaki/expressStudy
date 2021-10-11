const express = require('express')

const app = express()
const port = 3001

app.get('/', (req, res) => {
    // 设置响应状态码
    res.statusCode = 201

    // 设置结束响应
    // res.end()
    // res.send('hello world!')

    // 连续发送数据，最终都属于当前请求的响应结果
    // res.write('a')
    // res.write('b')
    // res.write('c')

    // 结束响应的同时发送相应数据
    // res.end('This is end')

    // 如此发送的数据express可以自动将其在响应时转为json数据
    // res.send({
    //     foo: 'bar'
    // })
    
    // 设置cookie,express拓展方法
    res.cookie('foo', 'bar')
    res.cookie('a', 1234)
    // 同时设置响应码以及发送数据
    res.status(202).send('success')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})