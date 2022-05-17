module.exports=option=>{
    
    return async (req,res,next)=>{
        const modeName=require('inflection').classify(req.params.resource)
        req.Model=require(`../models/${modeName}`)
        next()
    }
}