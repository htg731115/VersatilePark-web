<template>
    <div>
        <el-row>
            <el-col :span="4"  >
                
                1
            </el-col>
            <el-col :span="5" :offset="10">
                <img src="../assets/full.svg" class="full-img" @click="click()"/>
                {{username}}
                <img src="../assets/userlog.svg" class="full-img" width="100%">
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
        }
    },
    methods:{
        click(){
                screenfull.toggle();
                this.$store.commit('setUserName','helloworld');
            }    
    }
}
</script>

<style lang="scss">
.full-img{
    width:30px;
    margin-top:10px;
    padding: 10px 10px 10px 10px; 
    cursor: pointer;
    
}
</style>