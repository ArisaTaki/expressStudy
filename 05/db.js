// 封装db模块进行统一管理与使用
const fs = require('fs')
// 避免回调地狱，我们使用express自带的util工具promisify
const { promisify } = require('util')
const path = require('path')

// 这样一来我们的readFile方法就是Promise方法了
const readFile = promisify(fs.readFile)

const dbPath = path.join(__dirname, './db.json')

exports.getDb = async () => {
    const data = await readFile(dbPath, 'utf-8')
    return JSON.parse(data)
};
