<template>
    <div class="tabWapper">
        <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 通用套餐管理</span>
            <CommonPayCombo/>
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import CommonPayCombo from "../components/CommonPayCombo.vue"
    export default{
        components:{CommonPayCombo},
        data(){
            return{
                someone:1,
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
<style>
.tabWapper{
    margin-top: 10%;
}
</style>