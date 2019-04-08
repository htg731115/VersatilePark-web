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
            this.$axios.post("/api/user-login").then(res=>{
            
            })
           this.$router.push('/user/Main')
        }
    }
}
</script>

<style>

</style>
