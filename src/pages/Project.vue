<template>
  <div id="Project">
    <el-table
       :data="Projectdata"
       style="width: 97.7% height:500px"
       max-height="250"
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
  </div>
</template>

<script>
export default {
  name:'project',
  data(){
    return{
      Projectdata:[],
    }
  },
  mounted(){
    this.GetProject();
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
            data[i]=obj
          }
          this.Projectdata=data
      })
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
