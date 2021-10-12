const express = require("express");

const port = 3001;
const app = express();

/**
 * 中间件其实就属于是一种AOP的面向切面编程的功能
 * 将日志记录，性能统计，安全控制，事务处理，异常处理等等代码从业务逻辑代码中划分出来，通过对这些行为的分离，可以将它们独立到非指导
 * 业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑的代码
 *
 * 利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可复用性，提高了开发的效率以及可维护性
 *
 * 总结一下大概就是现有的代码程序中，在程序生命周期或者横向流程中 加入 或者 减去 一个或者多个功能的时候不会影响到原来的功能
 *
 * 在express中，中间件就是一个可以访问请求对象，响应对象，调用next方法的一个函数
 */
// 中间件的顺序很重要，需要放在所有的路由请求之前，程序运行是从上往下的
// 但是要注意，路由也是由中间件来处理的，也有第三个参数next
// req(请求对象), res(响应对象), next(下一个中间件)

function fn (options) {
    return (req, res ,next) => {
        console.log(`hello ${options.message}`)
        // 如果你当前的中间件功能没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件功能，否则请求就会被挂起
        next()
    }
}
app.use(fn({
    message: 'world'
}))

app.use((req, res, next) => {
  req.foo = "bar";
  res.abc = () => {
    console.log("abc");
    return 1
  };
  console.log(req.method, req.url, Date.now());
  // 交出执行权，往后继续匹配执行
  next();
});

app.get("/", (req, res) => {
  console.log(res.abc())
  console.log(req.foo);
  res.send("get /");
});

app.get("/about", (req, res) => {
  res.send("get /about");
});

app.post("/login", (req, res) => {
  res.send("post /login");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
