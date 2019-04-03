<template>
  <div >
    <el-row>
      <el-row>
        <el-col :span="5" v-for="(item,index) in Managerdata.slice(0,3)" :key="item.index" :offset=2 class="Manager">
          <el-card>
            <img src="../assets/timg.jpg" style="width:100%"/>
              <el-row>{{item.name}}</el-row>
              <el-row>{{item.project}}</el-row>
              <el-row>
                <el-col :span="8"><el-popover placement="top" v-model="showPop2[index]">
                    <p>你确定要更改的他的项目吗</p>
                    <el-select v-model="select">
                      <el-option v-for="item2 in emptyProject[0]" :key="item2.id" :value="item2.id" :label="item2.name"></el-option>
                    </el-select><p/>
                  <el-button size="mini" type="text" @click="Cancelhover2(index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="Alter(item.id)">确定</el-button>
                  <el-button slot="reference" type="text" @click="CallIn">编辑</el-button>
                </el-popover></el-col>
                <el-col :span="8"><el-button type="text" @click="GoCheck(item.id)">查看</el-button></el-col>
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
        <el-col :span="5" v-for="(item,index) in Managerdata.slice(3)" :key="item.index" :offset=2 class="Manager">
          <el-card>
            <img src="../assets/timg.jpg" style="width:100%"/>
              <el-row>{{item.name}}</el-row>
              <el-row>{{item.project}}</el-row>
              <el-row>
                <el-col :span="8"><el-popover placement="top" v-model="showPop3[index]">
                    <p>你确定要更改的他的项目吗</p>
                    <el-select v-model="select">
                      <el-option v-for="item2 in emptyProject[0]" :key="item2.id" :value="item2.id" :label="item2.name"></el-option>
                    </el-select><p/>
                  <el-button size="mini" type="text" @click="Cancelhover2(index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="Alter(item.id)">确定</el-button>
                  <el-button slot="reference" type="text" @click="CallIn">编辑</el-button>
                </el-popover></el-col>
                <el-col :span="8"><el-button type="text" @click="GoCheck(item.id)">查看</el-button></el-col>
                <el-col :span="8">
                  <el-popover placement="top" v-model="showPop4[index]">
                    <p>你确定要删除吗？</p>
                  <el-button size="mini" type="text" @click="Cancelhover(index)">取消</el-button>
                  <el-button type="primary" size="mini" @click="Delect(index)">确定</el-button>
                  <el-button slot="reference" type="text">删除</el-button>
                </el-popover></el-col>
              </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
         <el-pagination
           @current-change="handleCurrentChange"
           :current-page.sync="pageNum"
           small
           layout="prev, pager, next, jumper"
           :total="totalPages">
         </el-pagination>
  </div>
</template>
<script>
export default{
  data(){
    return {
      Managerdata:[],
      emptyProject:[],
      showPop:[],
      showPop2:[],
      showPop3:[],
      showPop4:[],
      select:'',
      totalPages:10,
      pageNum:1
    }
  },
  mounted(){
    this.GetManager();
    this.GetEmptyProject();
  },
  methods:{
    GetManager(){
      this.$axios.get('api/getmanager2',{
        params:{
          pageNum:this.pageNum
        }
      }).then(response=>{
        this.Managerdata=response.data.list
        this.totalPages=response.data.pages*10
        
      })
    },
    Cancelhover(index){
      this.showPop.splice(index, 1, false);
      this.showPop[index]=false;
    },
    Cancelhover2(index){
      this.showPop2.splice(index, 1, false);
      this.showPop2[index]=false;
      this.select="";    
    },
    Delect(index){
      this.$axios.post('/api/delmanager',{
        id:this.Managerdata[index].id
      }).then(res=>{
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        })
        setTimeout(() => {this.GetManager(), 1200});
      })
    },
    GoCheck(id){
      this.$router.push({ name: 'Detail', params: { id: id }})
    },
    handleCurrentChange(){
      this.GetManager()
    },
    CallIn()
    {
      this.select="";
    },
    GetEmptyProject(){
      this.$axios.get("/api/getemptyproject").then(res=>{
        this.emptyProject.push(res.data)
        console.log(this.emptyProject)
      })
    },
    Alter(managerid){
      console.log("啊啊呜"+managerid)
      this.$axios.post("/api/alterproject",{
          admin_id:managerid,project:this.select
      }).then(res=>{
          
      })
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
