<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label='item.name' :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label='item.name' :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label='item.name' :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" 
                @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
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
      model:{
        avatar:'',
        name:'',
        scores:{
          difficult:0,
          skills:0,
          attack:0,
          survive:0
        },
        skills:[]
      },
      // 保存类型的选项，即分类列表中的数据
      categories:[],
      // 保存物品的选项
      items:[]
    }
  },
  methods: {
    async save(){
      let res
      if(this.id){
        // 修改分类
        res=await this.$http.put(`rest/heros/${this.id}`,this.model)
      }else{
        // 新建分类
        res=await this.$http.post('rest/heros',this.model)
      }
      this.$router.push('/heros/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取单个分类详情信息
    async fetch(){
      const res=await this.$http.get(`rest/heros/${this.id}`)
      this.model=Object.assign(this.model,res.data)
    },
    // 上传图片成功后
    afterUpload(res){
      this.model.avatar=res.url
    },
    // 获取分类列表
    async fetchCategories(){
      const res=await this.$http.get('rest/categories')
      this.categories=res.data
    },
    // 获取物品列表
    async fetchItems(){
      const res=await this.$http.get('rest/items')
      this.items=res.data
    },
  },
  created() {
    this.fetchCategories()
    this.fetchItems()
    // 如果id存在，表示是编辑，不是新建。因此通过fetch去获取该分类的具体信息
    this.id&&this.fetch()
  },
}
</script>
<style>

</style>
