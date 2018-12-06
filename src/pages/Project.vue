<template>
  <div id="Project">
    <el-row >
      <el-col :span="2" :offset="19">
      <el-button type="primary" v-on:click="ShowDialog=true">新增</el-button></el-col>
    </el-row>
    <el-row>
    <el-table
       :data="Projectdata"
       style="width: 97.7%"
       >
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
         prop="address"
         label="地址"
         width="150">
       </el-table-column>
       <el-table-column
         prop="opentime"
         label="开业时间"
         width="140">
       </el-table-column>
       <el-table-column
         prop="admin"
         label="管理员"
         width="140">
       </el-table-column>
       <el-table-column
         prop="state"
         label="运营状态"
         width="140">
       </el-table-column>
       <el-table-column
         prop="total_num"
         label="总车位数"
         width="140">
       </el-table-column>
       <el-table-column
         label="操作"
         width="120">
       </el-table-column>
     </el-table>
     </el-row>

     <el-dialog title="添加项目" :visible.sync="ShowDialog" :v-if="ShowDialog==false">
       <el-form :model="addproform" >
         <el-form-item label="项目名称" :label-width="formLabelWidth" >
           <el-input autocomplete="off"  v-model="addproform.name"></el-input>
         </el-form-item>
         <el-form-item label="活动区域" :label-width="formLabelWidth">
           <el-select  placeholder="请选择活动区域">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="ShowDialog = false">取 消</el-button>
         <el-button type="primary" v-on:click="AddProject()">确 定</el-button>
       </div>
     </el-dialog>


  </div>
</template>

<script>
export default {
  name:'project',
  data(){
    return{
      Projectdata:[],
      addproform:{
          name:'',
          address:'',
          opentime:'',
          state:'',
          total_num:''
      },
      ShowDialog:false,
      formLabelWidth:'120px',
    }
  },
  mounted(){
    this.GetProject();
    console.log(this.ShowDialog);
  },
  methods:{
    GetProject :function () {
      var data=new Array()
      this.$axios.get('api/getproject').then(response=>{
        console.log(response.data[0].id);
        for(let i=0;i<response.data.length;i++)
          {
            var obj={}
            obj.id=response.data[i].id
            obj.name=response.data[i].name
            obj.address=response.data[i].address
            obj.opentime=response.data[i].opentime
            obj.state=response.data[i].state
            obj.total_num=response.data[i].total_num
            data[i]=obj
          }
          this.Projectdata=data
      })
    },
    AddProject :function(){
       this.$axios.post('api/addproject',{
         name:this.addproform.name,address:"福建省",opentime:"2018-12-03",state:"1",total_num:"210"
       }).then(response=>{
         console.log(response)
       })
      console.log(this.addproform.name)
    }

  }
}
</script>
<style >
.el-table th{
       background:#f4f4f4;
       font-size: medium;
     }
</style>
