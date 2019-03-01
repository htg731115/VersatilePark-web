<template>
    <div>
        <el-row>
            <el-col :span="4"  >
                
            </el-col>
            <el-col :span="5" push="20">
                <img src="../assets/full.svg" width="30px" @click="click()"/>

 
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{

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

</style>
