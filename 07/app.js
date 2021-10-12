const express = require('express')

const port = 3001
const app = express()

// // 应用程序级别中间价
// // 不关心请求路径，不做任何限定的中间件
// app.use((req, res, next) => {
//     console.log('Time' + Date.now())
//     next()
// })

// 限定请求路径
// app.use('/user/:id', (req, res, next) => {
//     console.log(`Request Type:${req.method}`)
//     next()
// })

// 限定请求方法+请求路径，这就是路由，可以理解为
// app.get('/user/:id', (req, res, next) => {
//     res.send('USER')
// })

// 多个处理函数
// app.use('/user/:id', (req, res ,next) => {
//     console.log(`Request URL:${req.originalUrl}`)
//     // 这边的next会执行下一个函数
//     next()
// }, (req, res, next) => {
//     console.log(`Request Type:${req.method}`)
//     // 这边的next会脱离当前的处理栈
//     next()
// })

// 为同一个路径定义多个处理中间件
// app.get('/user/:id', (req, res, next) => {
//     console.log(`ID:${req.params.id}`)
//     next()
// }, (req, res, next) => {
//     res.send('User Info')
//     // next()
// })
// // handler for the /user/:id path. which prints the user ID
// app.get('/user/:id', (req, res, next) => {
//     res.end(req.params.id)
// })

// 要从路由器中间件堆栈中跳过其余中间价功能，调用next('route')将控制权传递给下一条路由
// 此语句仅仅只有在使用app.METHOD()或者router.METHOD()函数加载的中间函数中生效
// app.get('/user/:id', (req, res, next) => {
//     // if the userId is 0, skip to the next route
//     if (req.params.id === '0') next('route')
//     // otherwise pass the control to the next middleware function in the stack
//     else next()
// }, (req, res, next) => {
//     res.send('regular')
// })

// app.get('/user/:id', (req, res, next) => {
//     res.send('special')
// })


const logOriginalUrl = (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  const logMethod = (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  }
  
  let logStuff = [logOriginalUrl, logMethod]
  app.get('/user/:id', logStuff, (req, res, next) => {
    res.send('User Info')
  })
app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})