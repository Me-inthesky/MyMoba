<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="name" label="广告位名称"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data() {
      return {
        items:[]
      }
  },
  methods: {
    // 获取广告位列表
    async fetch(){
      const res=await this.$http.get('rest/ads')
      this.items=res.data
    },
    // 删除广告位列表
    async remove(row){
      this.$confirm(`是否确定删除广告位"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`rest/ads/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除完成后需要重新获取数据列表
          this.fetch()
        })
    }
  },
  created() {
    this.fetch()
  },
}
</script>
