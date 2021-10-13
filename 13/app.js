const express = require('express')

const port = 3001
const app = express()

app.get('/', (req, res) => {
    res.send('success request: hello')
})

// 有一种特殊的路由方法，app.all()用于对所有的HTTP请求方法的路径加载中间件功能，所有的HTTP方法都会对指定的路由请求作为处理
// app.all('/all', (req, res, next) => {
//     console.log('all http request should be checked by this route')
//     next() //pass control to the next handler
// })

app.get('/random.text', (req, res,) => {
    res.send('success request: random.text')
})

// 路由路径与请求方法相结合，定义了可以进行请求的端点，路由路径可以是字符串，字符串模式或者正则表达式
// 字符：? + * ()是他们的正则表达式的对应的子集，连字符(-)和点(.)由基于字符串的路径按字面意义进行解释
// 如果您需要$在路径字符串中使用美元字符（），请将其转义([并括在和中])。例如，“ /data/$book”处用于请求的路径字符串将为“ /data/([\$])book”。

// 表示b可以有可以无，通过路由检查的就是abcd或者acd
app.get('/ab?cd', (req, res) => {
    res.send('success request: ad?cd')
})

// 表示b可以为一个或者多个都行
app.get('/ab+cd', (req, res) => {
    res.send('success request: ad+cd')
})

// abcd，ab(中间任意什么)cd
app.get('/ab*cd', (req, res) => {
    res.send('success request: ab*cd')
})

// abcde & abe
app.get('/ab(cd)?e', (req, res) => {
    res.send('success request: ab(cd)?e')
})

// 基于正则表达式的路由路径：此路由匹配其中带有"a"的任何内容
// app.get(/a/, (req, res) => {
//     res.send('/a/')
// })

// 这路线的路径匹配butterfly和dragonfly（以fly结尾的）
app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
})

// 路径参数，被命名为URL段，用于捕获URL中在其位置处指定的值，捕获的值将填充到req.params对象中，并且将路径中指定的route参数的名称作为各自的键
// app.get('/user/:id', (req, res) => {
//     console.log(req.params.id)
//     res.send(`user/${req.params.id}`)
// })

// 路径参数的名称必须由“文字字符”([A-Za-z0-9_])组成，由于连字符-和点.是按照字面解释的，因此可以将它们和路由参数一起使用，以实现有用的目的
// 要更好的控制可以由route参数匹配的确切字符串。可以在括号(())后面附加一个正则表达式
// 由于正则表达式通常是文字字符串的一部分，因为确保\使用其他反斜杠对所有字符进行转义，比如说\\d+，后续只能有整数
// 在express4.x中，不以常规方法解释正则表达式中的*字符，解决办法是使用{0,}代替*，这可能会在express5修复
app.get('/user/:userId(\\d+)', (req, res) => {
    console.log(req.params)
    res.send(`success request ${JSON.stringify(req.params)}`)
})

// 路由处理程序
// 可以提供行为类似于中间件的多个回调函数来处理请求，唯一的例外就是这些回调函数可能会调用next('route')绕过其余的路由回调，可以使用这种机制在路由上施加先决条件，然后在没有理由继续使用当前路由的情况下将控制权转交给后续路由
// 路由处理程序采用函数，函数数组或者二者结合的方式
// 多个回调函数可以处理一条路由（请确保指定了next对象）
app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function')
    next()
}, (req, res) => {
    res.send('hello from b')
})

// 回调函数数组可以处理路由
// const cb0 = (req, res, next) => {
//     console.log('cb0')
//     next()
// }

// const cb1 = (req, res, next) => {
//     console.log('cb1')
//     next()
// }

// const cb2 = (req, res) => {
//     res.send('hello from c')
// }

// app.get('/example/c', [cb0, cb1, cb2])

// 独立功能和功能数组的组合可以处理路由
const cb0 = (req, res, next) => {
    console.log('cb0')
    next()
}

const cb1 = (req, res, next) => {
    console.log('cb1')
    next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
    console.log('the response will be sent by the next function')
    next()
}, (req, res) => {
    res.send('hello from d')
})

// 响应方法
// app.get('/res', (req, res) => {
//     // 提示要下载的文件
//     res.download()
//     // 结束响应过程
//     res.end()
//     // 发送JSON响应
//     res.json()
//     // 发送带有JSONP支持的JSON响应
//     res.jsonp()
//     // 重定向请求
//     res.redirect()
//     // 渲染视图模板
//     res.render()
//     // 发送各种类型的响应
//     res.send()
//     // 将文件作为八位字节流发送
//     res.sendFile()
//     // 设置响应状态代码，将其字符串表示形式发送为响应正文
//     res.sendStatus()
// })

// app.route
// 这是使用定义的链式路由处理程序
app.route('/book')
.get((req, res) => {
    res.send('Get a random book')
})
.post((req, res) => {
    res.send('Add a book')
})
.put((req, res) => {
    res.send('Update the book')
})

// 快速路由器，使用express.Router该类创建模块化的，可以安装的路由处理程序，这方法我们在08已经实装

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})