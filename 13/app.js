const express = require('express')

const port = 3001
const app = express()

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/random.text', (req, res,) => {
    res.send('random.text')
})

// 表示b可以有可以无，通过路由检查的就是abcd或者acd
// app.get('/ab?cd', (req, res) => {
//     res.send('ad?cd')
// })

// 
app.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})