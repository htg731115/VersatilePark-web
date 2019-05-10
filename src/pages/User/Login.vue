<template>
<div>
    <van-cell-group style="
    margin-top: 150px">
    <van-field
        v-model="account"
        center
        clearable
        label="账号"
        placeholder="请输入账号"
    ></van-field>
      <van-field
        v-model="password"   
        type="password"
        center
        clearable
        label="密码"
        placeholder="请输入密码"
    >
    </van-field>

    </van-cell-group>
    <van-cell-group>
    <van-button type="default" @click="register()">注册</van-button>
    <van-button type="primary" @click="login()" >登录</van-button>
    </van-cell-group>
</div>
</template>

<script>
export default {
    data(){
        return{
            account:'',
            password:'',
        }
    },
    methods:{
        register(){
        this.$router.push('/user/Register');
        },
        login(){
                
                this.$axios.post("/api/user-login",{
                    name:this.account,password:this.$md5(this.password)
                }).then(res=>{
                if("0" == res.data.code){
                    this.$toast.fail("该账号不存在");
                }else if("1" == res.data.code){
                    this.$toast.fail("账号密码错误");
                }else{
                    this.$toast.success("登录成功");
                    var obj ={};
                    obj.id=res.data.id;
                    obj.userType = res.data.type;
                    this.$store.commit('setLogin',obj);
                    this.$router.push('/user/Main');
                }
            })
           
        }
    }
}
</script>

<style>

</style>
