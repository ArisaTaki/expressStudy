const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('hello, express method get')
})

app.post('/', (req, res) => {
    res.send('hello, express method post')
})

app.put('/', (req, res) => {
    res.send('hello, express method put')
})

app.delete('/', (req, res) => {
    res.send('hello, express method delete')
})

app.listen(port, () => {
    console.log(`we get message of the res from port: ${port}`)
})