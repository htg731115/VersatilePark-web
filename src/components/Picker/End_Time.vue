<template>
    <div>
        <el-time-select
            v-model="endDate"
            :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }"
            placeholder="选择时间">
        </el-time-select>
    </div>
</template>
<script>
export default {
    data(){
        return {
            endDate:'',
        }
    }
}
</script>

<style>

</style>
