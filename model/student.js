const fs = require('fs'); //引入fs模块来帮助我们读文件
const path = require('path')


function readAllStudents() { //读取所有学生的方法
    return new Promise((resolve, reject) => { //这里返回一个Promise，在index.js中可使用async,await拿到这里返回的学生数据
        fs.readFile(path.join(__dirname, 'db.json'), (err, data) => { //设置要读文件的路径
            if (!err) {
                resolve(JSON.parse(data.toString())); //加上toString()方法，将Buffer数组转化成字符串,JSON.parse()方法将字符串转换成对象
            } else {
                reject(err)
            }
        })
    })
}

async function saveStudent(stu) { // 保存一个学生的方法，保存的方法：先全部读出来，再进行末尾追加，最后进行重新写入
    let result = await readAllStudents(); //保存第一步：先读取所有学生
    stu.id = result.students.length == 0 ? 1 : parseInt(result.students[result.students.length - 1].id) + 1 //为传递的数据手动添加id,判断id为0的情况
    result.students.push(stu); //保存第二步：将新加的数据在末尾进行追加
    return _writeStudents(result.students)
}

async function findStudentById(id) { //找学生拿具体信息的方法，先把所有学生找出来，再匹配找到需要的那个
    let result = await readAllStudents();
    let stu = result.students.find((item) => {
        if (item.id == id) {
            return item;
        }
    })
    return stu;
}

async function modifyStudent(stu) { //修改学生具体信息的方法xuesheng
    let result = await readAllStudents(); //先读所有学生
    var newStudents = result.students.map((item) => { //进行修改
        if (item.id == stu.id) {
            return stu;
        }
        return item;
    })
    return _writeStudents(newStudents)
}

function _writeStudents(stus) { //下划线表示该方法仅在当前js代码中生效
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify({
            students: stus
        }), (err) => {
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        })
    })
}

async function deleteStudentById(id) { //删除学生信息的方法
    let result = await readAllStudents();
    var newStudents = result.students.filter((item) => {
        if (item.id != id) {
            return item;
        }
    })
    return _writeStudents(newStudents)
}
exports.readAllStudents = readAllStudents; //导出readAllStudents方法
exports.saveStudent = saveStudent; //导出saveStudent方法
exports.findStudentById = findStudentById; //导出findStudentById方法
exports.modifyStudent = modifyStudent; //导出modifyStudent方法
exports.deleteStudentById = deleteStudentById; //导出deleteStudentById方法