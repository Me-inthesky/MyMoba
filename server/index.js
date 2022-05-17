const express=require("express")

const app=express()

app.use(require('cors')())
app.use(express.json())
// 配置静态连接库，将uploads文件下的东西变为静态文件，让uploads文件下的文件可以通过/uploads来访问
app.use('/uploads',express.static(__dirname+'/uploads'))

app.set('secret','d1awd8afa')

// 连接数据库
require('./plugins/db')(app)
// 设置响应
require('./routes/admin/index')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000 ');
})