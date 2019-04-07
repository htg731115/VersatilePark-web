<template>
    <div>  
        <el-input placeholder="请输入套餐名称" prefix-icon="el-icon-search" v-model="comboName">
  </el-input>
    </div>
</template>

<script>
export default {
    data(){
        return{
            comboName:null,
        }
    }
}
</script>

<style>

</style>
