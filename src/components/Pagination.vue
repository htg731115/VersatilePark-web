<template>
<div>
    <el-pagination
    v-model="pageNum"
    background
    :total="total"
    layout="prev, pager, next">
</el-pagination>
</div>

</template>

<script>
export default {
    data(){
        return{
            pageNum:1,
            total:10,
        }
    }
}
</script>

<style>

</style>
