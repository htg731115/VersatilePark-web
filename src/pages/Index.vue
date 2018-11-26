<template>

<div id="app">
  <h1  class="animated tada delay-3s">
    VersatilePark
  </h1>
  <div class="animated  zoomInDown ">
    <el-form :model="LoginForm" :rules="rules" ref = "LoginForm"  class = "login-container" label-width="70px">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="LoginForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" >
        <el-input type="password" v-model="LoginForm.password"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item >
        <el-row >
          <el-col ><el-button class=submit type="primary" v-on:click="submit(LoginForm)" :loading="loading"> 登录</el-button></el-col>
        </el-row>
        <el-row  class="bottomLink">
          <el-col :span="8" :offset="5" >
            <a href="Forget">忘记密码</a></el-col>
          <el-col  :span="2" :offset="1" >|</el-col>
          <el-col  :span="4" :offset="1" >
              <a href="bai">注册</a></el-col>
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
      loading:false,
      Remessage:"",
      remember:true,
      LoginForm:{
        name:'',
        password:'',

      },
      rules:{
        name:[{ required:true ,message:'请输入账号',trigger:'blur'}],
        password:[{ required:true ,message:"请输入密码",trigger:'blur'},{min:6,max:16,message:"密码长度有误"}]
      }
    }
  },
  mounted(){
    this.call2();
  },
  methods:{
    submit:function(LoginForm)
    {
      this.$store.commit("setUsername","obj")
      console.log(this.$store.state.Username)
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          this.loading=true
          this.$ajax.post('api/addUser',{
            name:this.LoginForm.name,
            password:this.$md5(this.LoginForm.password)
          }).then(response => {
        // success callback
          setTimeout(() => {
                    this.loading = false}, 500)
          if(response.data==true){
            this.Remessage="登录成功了"
            this.$store.commit('increment')
          }else
            this.Remessage="登录失败,密码错误"
          this.$notify({
          tittle:'警告',
          message:this. Remessage,
          type:'warning'
          });
          console.log(this.Remessage);
          }, response => {
        // error callback
          this.$notify({
          tittle:'警告',
          message:"有问题",
          type:'warning'
          });
          })

        }
        else {
          console.log("bad")
        }
      })
    },//登录
    call2:function()
    {
      console.log(this.$store.state.Username)

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
    margin: 50px auto;
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
h1{
  color: #303133;
}
</style>
