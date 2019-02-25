<template>
    <div>
        
        <div class="tabWapper">
            <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 通用套餐管理</span>
                <CommonPayCombo/>
            </el-tab-pane>
            <el-tab-pane label="各项目自定义套餐">
                <ComboList/>
            </el-tab-pane>
            <el-tab-pane label="角色管理"><LogComboList/> </el-tab-pane>
            
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>
        <el-card>
            <PurchaseMonth class="echart"/>
        </el-card>
    </div>
</template>
<script>
    import CommonPayCombo from "../components/CommonPayCombo.vue";
    import ComboList from "../components/Combo_List.vue";
    import LogComboList from "../components/Log_Combo_List.vue";
    import SearchComboName from '../components/Search_Combo_Name.vue';
    import PurchaseMonth from '../components/purchase_month.vue';
    export default{
        components:{CommonPayCombo,ComboList,LogComboList,SearchComboName,PurchaseMonth},
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
    margin-top: 1%;
}
.echart{
    position: relative;
    left: 24%;
}
</style>