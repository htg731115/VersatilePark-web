<template>
    <div>
        <el-row>
            <el-col :span="4"  >
                
                1
            </el-col>
            <el-col :span="5" :offset="14">
                <img src="../assets/full.svg" class="full-img" @click="click()"/>
                <div class="userName"  @click="visible = !visible">
                    <img  src="../assets/userlog.svg" class="full-img" width="100%">
                    {{username}}
                  
                    <el-popover 
                        placement="bottom"
                        width="133px"
                        trigger="manual"
                        v-model="visible" style="cursor: auto;">
                        <el-row><el-col :span="8" :offset="3">
                        <el-button >退出登录</el-button></el-col>
                        </el-row>
                    </el-popover>
                   
               </div>
              
            </el-col>
            
        </el-row>
    </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
    data(){
        return{
            username:this.$store.state.userName,
            visible: false,
        }
    },
    methods:{
        click(){
                screenfull.toggle();
                this.$store.commit('setUserName','管理员');
                this.username=this.$store.state.userName;
            }    
    }
}
</script>

<style lang="scss">
.full-img{
    width:30px;
    margin-top:10px;
    padding: 10px 10px 10px 10px; 
    vertical-align:-20px;
    cursor: pointer;
    
}
.userName{
    float: right;
    padding-right: 18px;
    font-size: 20px;
    color:white;
    box-shadow: 3px -8px 12px 12px rgba(3, 3, 3, 0.1);
    margin-top: 8px;
    width: 150px;
    cursor: pointer;

}
.userPanel{
    color: white;
    width: 133px;
    padding-right: 18px;
    float: right;
}
</style>