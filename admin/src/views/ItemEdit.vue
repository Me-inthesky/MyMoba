<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
      <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL+'/upload'"
        :headers="getAuthHeaders()"
        :show-file-list="false"
        :on-success="afterUpload">
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  // 进入编辑功能(不是新建)时，将具体某个分类的id传过来
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
        // 修改分类
        res=await this.$http.put(`rest/items/${this.id}`,this.model)
      }else{
        // 新建分类
        res=await this.$http.post('rest/items',this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取单个分类详情信息
    async fetch(){
      const res=await this.$http.get(`rest/items/${this.id}`)
      this.model=res.data
    },
    // 上传图片成功后
    afterUpload(res){
      this.$set(this.model,'icon',res.url)
    }
  },
  created() {
    // 如果id存在，表示是编辑，不是新建。因此通过fetch去获取该分类的具体信息
    this.id&&this.fetch()
  },
}
</script>
<style>

</style>
