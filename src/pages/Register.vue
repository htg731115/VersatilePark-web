<template>
  <el-form class="register-container" label-width="50px">
    <el-form-item label="账号"><el-input placeholder="请输入账号"></el-input></el-form-item>
    <el-form-item label="密码"></el-form-item>
  </el-form>
</template>
<script>
export default{
  data()
  {
    return{
      a:this.$store.state.Username,
    }
  }
}
</script>
<style>
.register-container{
  margin: 50px auto;
  width: 330px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #F2F6FC;
  box-shadow: 0 0 25px #67C23A;
}
</style>
