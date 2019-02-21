<template>
    <div class="tabWapper">
        <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 通用套餐管理</span>
            <CommonPayCombo/>
        </el-tab-pane>
        <el-tab-pane label="各项目自定义套餐">
            <Combo_List/>
        </el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import CommonPayCombo from "../components/CommonPayCombo.vue";
    import Combo_List from "../components/Combo_List.vue";
    export default{
        components:{CommonPayCombo,Combo_List},
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