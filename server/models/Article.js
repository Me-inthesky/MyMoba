const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    title:{type:String},
    // 连接关系数据库Category
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String},
})

module.exports=mongoose.model('Article',schema)