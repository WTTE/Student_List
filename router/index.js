const express = require('express')
const router = express.Router();
const Student = require('../model/student') //引入student.js,从而可以使用readAllStudents方法


// router.get("/index", (req, res) => {
//     res.send("HHHHHHHHH");//测试路由，收到get请求，在页面上输出HHHHHHHH
// })

router.get("/index", async (req, res) => {
    let stus = await Student.readAllStudents(); //利用aysnc,await拿到students.js返回的数据
    res.render("index.html", stus); //注意：只有在安装且配置好art-template后才能使用render,将上面拿到的stus放到render方法的第二个位置用于渲染页面
})

//来到编辑页面的方法
router.get("/students/edit/:id", async (req, res) => { //注意接收编辑按钮传过来的id
    // console.log(req.params['id'], "9999999999999999")
    //获取请求中的学生id信息
    var id = req.params['id'];
    //根据id信息查找该学生的具体信息
    let stu = await Student.findStudentById(id);
    // console.log(stu, "77777777777777777")
    res.render("edit.html", stu); //将拿到的学生具体信息stu传给edit页面
})

//来到新增页面的方法
router.get("/students/new", (req, res) => { //将students/new的get请求指定跳转到new.html页面
    res.render("new.html");
})

//处理新增学生请求
router.post("/students/new", async (req, res) => { //将students/new的get请求指定跳转到new.html页面
    await Student.saveStudent(req.body)
    // console.log("当前收到的是新增学生的post请求", req.body);
    res.redirect("/index") // 保存成功则跳转首页,redirect重定向到首页
})

//处理编辑学生请求
router.post("/students/edit", async (req, res) => {
    await Student.modifyStudent(req.body); //使用modifyStudent方法写入数据
    res.redirect("/index") //进行重定向
})

//处理删除学生请求
router.get("/students/delete/:id", async (req, res) => {
    var id = req.params['id'];
    await Student.deleteStudentById(id);
    res.redirect("/index")
})

module.exports = router; //导出