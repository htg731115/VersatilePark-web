<template>
    <div>
        <SearchComboName/>
        <el-table :data="LogComboData">
        </el-table>
    </div>
</template>
<script>
import SearchComboName from '../components/Search_Combo_Name.vue'
export default {
    components:{SearchComboName},
    data(){
        return{
            LogComboData:[],
        }
    },
    mounted(){
      //  this.$axios.get("api/log-comboList")
    }
}
</script>

<style>

</style>
