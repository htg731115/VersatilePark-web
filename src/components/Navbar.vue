<template>
    <div>
        <el-row>
            <el-col :span="4"  >
                1
            </el-col>
            <el-col :span="5" :offset="10">
                <img src="../assets/full.svg" class="full-img" @click="click()"/>
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
            click(){
                screenfull.toggle();
            }
        }
    },
    methods:{
        click(){
            console.log("111")
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
