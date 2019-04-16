<template>
    <div>
        <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
    <div style="margin-top:20px">
       <van-steps :active="active"
       active-icon="info-o">
        <van-step>输入手机号码</van-step>
        <van-step>输入账号密码</van-step>
        <van-step>个人详细资料</van-step>
        <van-step>完成</van-step>
    </van-steps>
      <van-cell-group v-if="active==0">
         <van-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"/>
      </van-cell-group>
      <van-cell-group v-if="active==1">
         <van-field
            v-model="account"
            label="用户名"
            placeholder="请输入用户名"/>
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"/>
        <van-field
            v-model="password2"
            type="password"
            label="重复密码"
            placeholder="请输入重复密码"/>
      </van-cell-group>
       <van-cell-group v-if="active==2" style="margin-bottom:20px">
         <van-field
            v-model="username"
            label="姓名"
            placeholder="请输入姓名"/>
        <van-field
            v-model="idnumber"
            label="身份证"
            placeholder="选填"/>
            <van-row>
            <van-radio-group v-model="sex" style="margin-top: 40px">
               <van-col offset="8" span="4"> <van-radio name="1">男</van-radio></van-col>
               <van-col span="4"> <van-radio name="2">女</van-radio></van-col>
            </van-radio-group>
            </van-row>
      </van-cell-group>
    <van-button v-if="active!=0" @click="backStep">上一步</van-button>
    <van-button  v-if="active!=2" @click="nextStep">下一步</van-button>
     <van-button  @click="commit">完成</van-button>
    </div></div>
</template>

<script>
export default {
    data(){
        return{
            active:0,
            phone:'',
            account:'',
            password:'',
            password2:'',
            username:'',
            sex:'1',
            idnumber:'',

        }
    },
    methods:{
        nextStep(){
            if(this.active == 0){
                if(this.phone!=''){
                this.$axios.get("/api/can-register",{
                    params:{
                        phone:this.phone
                    }
                }).then(res=>{
                    if(res.data==true){
                        this.active =1
                    }else{
                    this.$toast.fail("已存在该手机号码");
                    }
                })}else{
                    this.$toast.fail("请输入正确的手机号");
                }
            }else if(this.active ==1){
                if(this.password!= this.password2){
                return this.$toast.fail("两次输入的密码不符");
                }
                this.$axios.get("/api/can-register2",{params:{name:this.account}}).then(res=>{
                    if(res.data==false)
                        return  this.$toast.fail("该账号已存在");
                    else{
                        this.active++;
                    }
                })
            }else if(this.active==2){
                if(this.username=="")
                    return this.$toast.fail("请输入您的名字")
                    
            }
            
            else{
                this.active = ++this.active % 3
            }
        },
        backStep(){
            this.active = --this.active;
        },
        commit(){
            if(this.username=='')
                return this.$toast.fail("请输入您的名字")
            let postData = this.$qs.stringify({
                phone:this.phone,name:this.account,username:this.username,password:this.$md5(this.password),sex:this.sex,idnumber:this.idnumber
            })
              this.$axios.post("/api/add-customer",postData
               ).then(res=>{
                    this.$toast.success("注册成功");
            })
        }
    }
}
</script>

<style>

</style>
