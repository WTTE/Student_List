const express = require("express")
const app = express();
const router = require('./router') //引入同级目录下的router
const path = require('path');
const bodyParser = require('body-parser') //挂载bodyParser中间件插件

//挂载参数中间件post
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
//parse application/json
app.use(bodyParser.json());



//设置art-template
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules'))) //设置静态资源路径
app.engine('html', require('express-art-template')); //设置art-template渲染以.html结尾的文件
app.set('views', __dirname + '/views'); //设置默认渲染文件所在的路径，如果不写则默认渲染当前项目下的views文件夹里的文件


app.use(router) //启用router

app.listen(8000, () => {
    console.log("8000端口已启用")
})