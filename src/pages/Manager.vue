<template>
  <div >
    <el-row>
      <el-col :span="5" v-for="(item,index) in Managerdata" :key="item.index" :offset=2 class="Manager">
        <el-card>
          <img src="../assets/timg.jpg" style="width:100%">
            <el-row>{{item.name}}</el-row>
            <el-row>{{item.project}}</el-row>
            <el-row>
              <el-col :span="8"><el-button type="text">编辑</el-button></el-col>
              <el-col :span="8"><el-button type="text">查看</el-button></el-col>
              <el-col :span="8">
                <el-popover placement="top" v-model="showPop[index]">
                  <p>你确定要删除吗？</p>
                <el-button size="mini" type="text" @click="Cancelhover(index)">取消</el-button>
                <el-button type="primary" size="mini" @click="Delect(index)">确定</el-button>
                <el-button slot="reference" type="text">删除</el-button>
              </el-popover></el-col>
            </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10":offset=6>
      <div class="block">
         <el-pagination
           @current-change="handleCurrentChange"
           :current-page.sync="pageNum"
           background
           layout="prev, pager, next, jumper"
           :total="totalPages">
         </el-pagination>
       </div>
     </el-col>
   </el-row>
  </div>
</template>
<script>
export default{
  data(){
    return {
      Managerdata:[],
      showPop:[],
      totalPages:10,
      pageNum:1
    }
  },
  mounted(){
    this.GetManager()
  },
  methods:{
    GetManager :function(){
      this.$axios.get('api/getmanager2',{
        params:{
          pageNum:this.pageNum
        }
      }).then(response=>{
        this.Managerdata=response.data.list
        this.totalPages=response.data.pages*10
        console.log(this.totalPages);
      })
    },
    Cancelhover(index){
      this.showPop.splice(index, 1, false);
      this.showPop[index]=false;
    },
    Delect(index){
      this.$axios.post('/api/delmanager',{
        id:this.Managerdata[index].id
      }).then(res=>{
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        })
        setTimeout(() => {
                      this.$router.go(0)}, 1200);
      })
    },
    handleCurrentChange(){
      this.GetManager()
    }
  }
}
</script>
<style>
.Manager{
  margin-top: 40px;
  margin-bottom: 40px;
  box-shadow: 0 0 30px #cac6c6;
}
</style>
