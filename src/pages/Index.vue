<template>
<!--背景图-->
<div id="app">
<!--login框，表单+tab标签页的组合-->
  <div class="animated  zoomInDown">
    <el-form :model="LoginForm" :rules="rules" ref = "AccountForm"  class = "demo-ruleForm login-container" label-width="70px">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="LoginForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" >
        <el-input type="password" v-model="LoginForm.password"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item >
        <el-row >
          <el-col ><el-button class=submit type="primary" v-on:click="submit" > 登录</el-button></el-col>
        </el-row>
        <el-row  class=bottomLink>
          <el-col :span="8" :offset="5" >
            <a>忘记密码</a></el-col>
          <el-col  :span="2" :offset="1" >|</el-col>
          <el-col  :span="4">
              <a href="bai" >注册</a></el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>
</div>

</template>

<script>
export default {
  el:'#app',
  data(){
    return {
      seen:false,
      LoginForm:{
        name:'',
        password:'',

      },
      rules:{
        name:[{ required:true ,message:'请输入账号',trigger:'blur'}],
        password:[{ required:true ,message:"请输入密码",trigger:'blur'}]
      }
    }
  },
  methods:{
    submit:function()
    {

    this.$ajax.get('api/all').then(response => {
    // success callback
    this.$notify({
      tittle:'警告',
      message:response.data,
      type:'warning'
    });
    console.log(response.data)
}, response => {

    // error callback
    this.seen=true
})
    }
  }
}



</script>

<style>
.submit{
    width: 100% ;
    font-size: 18px;
}
.bottomLink{
  line-height:40px;
  font-size:18px;
}

.login-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 330px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
a{
    text-decoration:none;
    font-family: "PingFang SC";
    color: #409EFF;
    line-height:40px;

  }
a:hover{
    text-decoration:underline;
}

</style>
