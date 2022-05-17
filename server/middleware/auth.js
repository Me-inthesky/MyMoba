module.exports=options=>{
    const jwt=require('jsonwebtoken')
    const AdminUser=require('../models/AdminUser')
    var assert = require('http-assert')
    return async (req,res,next)=>{
        // 校验用户是否登录（后端的头部用小写，前端是大写，自动对应）,提取token
        const token=String(req.headers.authorization||'').split(' ').pop()
        assert(token,401,'请先登录')
        // 验证token并且解密，解密出加密时的信息,之前加密的信息是用户的id
        const {id}=jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登录')
        // 通过解密出的id在数据库中找到用户,并且挂载到请求req中
        req.user=await AdminUser.findById(id);
        assert(req.user,401,'请先登录')
        await next()
    }
}