<template>
  <div >
    <el-row>
      <el-button style="margin-top:20px" @click="show()">新增管理员</el-button>
      <el-row>
        <el-col :span="5" v-for="(item,index) in Managerdata.slice(0,3)" :key="item.index" :offset=2 class="Manager">
          <el-card>
            <img :src="item.imgSrc" style="width:100%" v-if="item.imgSrc">
            <img  v-else src="../assets/timg.jpg" style="width:100%"/>
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
            <img :src="item.imgSrc" style="width:100%" v-if="item.imgSrc">
            <img v-else src="../assets/timg.jpg" style="width:100%"/>
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

<!-- dialog -->
  <el-dialog title="新增管理员" :visible.sync="ShowDialog" width="30%" >
    <el-row>
      <el-col style="margin-bottom:20px"><el-col :span="4">账号</el-col><el-col :span="18"><el-input v-model="name" placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">密码</el-col><el-col :span="18"><el-input v-model="password" type="password" placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">姓名</el-col><el-col :span="18"><el-input v-model="userName" placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">手机号码</el-col><el-col :span="18"><el-input v-model="phoneNum" placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">身份证号码</el-col><el-col :span="18"><el-input v-model="idNum" placeholder="" /></el-col></el-col>
      
       <el-radio v-model="sex" label="1">男</el-radio>
       <el-radio v-model="sex" label="2">女</el-radio>
    </el-row>
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-dialog>
<!-- dialog -->

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
      pageNum:1,
      ShowDialog:false,

      // 新增管理员
      name:"",
      password:"",
      userName:"",
      phoneNum:"",
      idNum:"",
      sex:"1",
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

      this.$axios.post("/api/alterproject",{
          admin_id:managerid,project:this.select
      }).then(res=>{
          
      })
    },
    submitForm(){
      if(this.name==""||this.password==""||this.userName==""||this.phoneNum==""||this.idNum==""){
        this.$message.error("所有项都为必填");
        return;
      }
      let postData = this.$qs.stringify({
        name:this.name,userName:this.userName,idNum:this.idNum,phoneNum:this.phoneNum,
        password:this.$md5(this.password),sex:this.sex
      })
      this.$axios.post("/api/addManager",postData).then(res=>{
        if(1==res.data){
          this.$message.error("该用户名已经被注册")
          
        }
        else{
          this.$message.success("添加成功");
          this.ShowDialog = false;
           this.GetManager();
        }
      })
    },
    show(){
      this.select="";
      this.ShowDialog  = true;
    },
    resetForm(){
      this.name="";
      this.password="";
      this.userName="";
      this.phoneNum="";
      this.idNum="";
      this.sex="1";
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
.el-dialog__body{
  line-height: 40px;
}
</style>
