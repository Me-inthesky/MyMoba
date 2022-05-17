<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  // 进入编辑功能(不是新建)时，将具体某个用户的id传过来
  props:{
    id:{}
  },
  data() {
    return {
      model:{},
    }
  },
  methods: {
    async save(){
      let res
      if(this.id){
        // 修改用户
        res=await this.$http.put(`rest/admin_users/${this.id}`,this.model)
      }else{
        // 新建用户
        res=await this.$http.post('rest/admin_users',this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取单个用户详情信息
    async fetch(){
      const res=await this.$http.get(`rest/admin_users/${this.id}`)
      this.model=res.data
    },
  },
  created() {
    // 如果id存在，表示是编辑，不是新建。因此通过fetch去获取该用户的具体信息
    this.id&&this.fetch()
    
  },
}
</script>
