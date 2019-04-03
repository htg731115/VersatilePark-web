<template>
    <div>  
        <el-input placeholder="请输入车牌号码" prefix-icon="el-icon-search" v-model="plateNumber">
  </el-input>
    </div>
</template>

<script>
export default {
    data(){
        return{
            plateNumber:null,
        }
    }
}
</script>

<style>

</style>
