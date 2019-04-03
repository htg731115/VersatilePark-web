<template>
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
</template>

<script>

  export default {

    methods: {
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>