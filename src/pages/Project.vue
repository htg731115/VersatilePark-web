<template>
  <div id="Project">
    <el-row class="frist" >
      <el-col :span="5"><el-input v-model="SContent" size="small" placeholder="项目名称"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input></el-col>
      <el-col :span="2"><el-button type="primary" size="small" v-on:click="Search()">搜索</el-button></el-col>
      <el-col :span="2" :offset=15><el-button type="primary" v-on:click="ShowDialog=true" size="medium" >新增</el-button></el-col>
    </el-row>
    <!--表格区域-->

    <el-row>
      <el-col>
        <el-card >
          <el-table
             :data="Projectdata"
             height="759"
             border>
             <el-table-column
               prop="id"
               label="项目ID"
               width="148">
             </el-table-column>
             <el-table-column
               prop="name"
               label="项目名称"
               width="180">
             </el-table-column>
             <el-table-column
               prop="opentime"
               label="开业时间"
               width="140">
             </el-table-column>
             <el-table-column
               prop="managername"
               label="管理员"
               width="140">
             </el-table-column>
             <el-table-column
               prop="state"
               label="运营状态"
               width="140">
               <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.state==1">运营中</el-tag>
                 <el-tag type="info" v-if="scope.row.state==0">未运营</el-tag>
              </template>
             </el-table-column>
             <el-table-column
               prop="total_num"
               label="总车位数"
               width="140">
             </el-table-column>
             <el-table-column
               prop="address"
               label="地址">
             </el-table-column>
             <el-table-column
               label="操作"
               width="120">
               <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" v-on:click="AlterProject(scope.row.id)">编辑</el-button>
               </template>
             </el-table-column>
           </el-table>
         </el-card>
       </el-col>

     </el-row>


     <el-row>
       <el-col :span="10" :offset="6">
       <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
     <!-- 项目添加弹窗 -->

     <el-dialog title="添加项目" :visible.sync="ShowDialog" :v-if="ShowDialog==false" >
       <el-form :model="addproform" ref="addproform" label-width="70px" >
         <el-form-item label="项目名称"  prop="name">
           <el-input autocomplete="off"  v-model="addproform.name" ></el-input>
         </el-form-item>
         <el-form-item label="项目地址" prop="address">
           <el-input v-model="addproform.address"></el-input>
         </el-form-item>
         <el-row>
           <el-col :span="8">
         <el-form-item label="车位数" prop="total_num">
           <el-input type="number" v-model="addproform.total_num"></el-input>
         </el-form-item></el-col>
           <el-col :span="10" >
         <el-form-item label="管理员" prop="managerid">
           <el-select v-model="addproform.managerid" ><el-option v-for="item in Managerdata" :label="item.name" :value="item.id" :key="item.id"></el-option></el-select>
         </el-form-item></el-col>
           <el-col :span="4" :offset=1>
         <el-form-item label="运营状态" prop="state">
           <el-switch v-model="addproform.state" ></el-switch>
         </el-form-item></el-col>
          </el-row>
         <el-form-item>
         <el-button v-on:click="ResetForm('addproform')">取 消</el-button>
         <el-button type="primary" v-on:click="AddProject()">确 定</el-button>
       </el-form-item>
       </el-form>
     </el-dialog>
<!--- -->

  </div>
</template>

<script>
export default {
  name:'project',
  data(){
    return{
      Projectdata:[],
      EmptyProject:[],
      Managerdata:[],
      addproform:{
          name:'',
          address:'',
          opentime:'',
          state:'',
          total_num:'',
          managerid:'',
      },
      pageNum:1,
      pageSize:10,
      totalPages:10,
      SContent:'',
      selectItem:[],
      ShowDialog:false,
    }
  },
  mounted(){
    this.GetProject();
    this.GetManager();
    console.log(this.ShowDialog);
  },
  methods:{
    GetProject :function () {
      this.$axios.get('api/getproject',{
        params: {
        pageNum:this.pageNum,pageSize:this.pageSize}
      }).then(response=>{
        console.log(response);
          this.Projectdata=response.data.list
          this.totalPages=response.data.pages*10
      })
    },
    handleCurrentChange(){
      this.GetProject()
    },
    GetManager :function(){
      var data=new Array()
      this.$axios.get('api/getmanager').then(response=>{
        this.Managerdata=response.data
      })
    },
    AddProject :function(){
       this.$axios.post('api/addproject',{
         name:this.addproform.name,address:this.addproform.address,opentime:"2018-02-03",state:"1",total_num:this.addproform.total_num,
       }).then(response=>{
       })
      console.log(this.addproform.name)
      ShowDialog=false
    },
    AlterProject:function(id){
      console.log(id)
    },
    ResetForm:function(formName) {
      this.ShowDialog=false
      this.$refs[formName].resetFields();
    },
    Search:function(){
      if(this.SContent==''){
        this.GetProject();
      }else{
      var data=new Array()
      this.$axios.get('api/searchproject',{
        params: {
          name:this.SContent
        }
      }).then(response=>{
          console.log(response.data)
         const tableItem = {
             id:  response.data.id,
             name:  response.data.name,
             address:  response.data.address,
             opentime:  response.data.opentime,
             state:response.data.state,
             total_num:response.data.total_num,
             admin:response.data.managername,
         }
         this.Projectdata.length=0
         this.Projectdata.push(tableItem);
    })
  }//else de
  }}
}
</script>
<style >
.el-table th{
       background:#f4f4f4;
       font-size: medium;
     }
.frist{
  margin: 8px 8px 20px 20px
}
</style>
