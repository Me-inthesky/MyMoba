import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http=new axios.create({
    baseURL:'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config=>{
    if(localStorage.token){
        config.headers.Authorization='Bearer '+(localStorage.token||'')
    }
    return config
},err=>{
    return Promise.reject(err)
})

http.interceptors.response.use(res=>{
    return res
},err=>{
    console.log(err);
    if(err.response.data.message){
        // 通过ElementUI中的$message方法进行提醒
        Vue.prototype.$message({
            message:err.response.data.message,
            type:'error'
        })
        if(err.response.status==401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http