module.exports=app=>{
    const express=require("express")
    const router=express.Router({
        mergeParams:true
    })
    const jwt=require('jsonwebtoken')
    const AdminUser=require('../../models/AdminUser')
    var assert = require('http-assert')
    // 资源的接口
    // 提交新建的资源
    router.post('/',async(req,res)=>{
        const model=await req.Model.create(req.body)
        res.send(model)
    })
    // 获取资源
    router.get('/',async(req,res)=>{
        const queryOptions={}
        if(req.Model.modelName==='Category'){
            queryOptions.populate='parent'
        }
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        // const items=await req.Model.find().populate('parent').limit(100)
        res.send(items)
    })
    
    // 获取单个资源的详情数据，点击具体某个资源，进入到编辑资源时
    router.get('/:id',async(req,res)=>{
        const model=await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 修改资源
    router.put('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })

    // 登录校验中间件
    const authMiddleware=require('../../middleware/auth')

    // 获取资源中间件
    const resourceMiddleware=require('../../middleware/resource')

    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)
    // const router=express.Router()
    // const Categories=require('../../models/Categories')
    // router.post('/cateries',async(req,res)=>{
    //     const model=await Categories.create(req.body)
    //     res.send(model)
    // })
    // router.delete('/cateries/:id',async(req,res)=>{
    //     await Categories.findByIdAndDelete(req.params.id,req.body)
    //     res.send({
    //         success:true
    //     })
    // })
    // })
    // app.use('/admin/api/',router)

    // 物品的接口
    // 图片上传
    const multer=require('multer')
    const upload=multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res)=>{
        const file=req.file
        file.url=`http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.post('/admin/api/login',async (req,res)=>{
        const {username,password}=req.body
        // 1.根据用户名找用户
        const user=await AdminUser.findOne({
            username:username
        }).select('+password')
        // 如果用户不存在
        assert(user,422,'用户不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        // 2.校验密码
        const isvalid=require('bcrypt').compareSync(password,user.password)
        assert(isvalid,422,'密码错误')
        // if(!isvalid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        // 3.返回token
        // 保存用户的_id到jwt中,相当于jwt中的负载
        const token=jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    // 错误处理
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}