<template>
    <div>  
        <el-row style="margin-top:20px;margin-bottom:20px">
            <searchComboName/>
        </el-row>
        <el-table :data="payComboList">
          <ElTableColumn label="序号">
              <template slot-scope="scope">
                  {{scope.row.id+1}}
              </template>
          </ElTableColumn>
          <ElTableColumn label="套餐名称" prop="combo_name" />
          <ElTableColumn label="套餐有效时间" prop="effective_length">
              <template slot-scope="scope">
                  {{scope.row.effective_length}}个月
              </template>
          </ElTableColumn>
          <ElTableColumn label="套餐开始时间" prop="start_time"></ElTableColumn>
          <ElTableColumn label="套餐结束时间" prop="end_time"></ElTableColumn>
          <ElTableColumn label="套餐价格" prop="money"></ElTableColumn>
          <ElTableColumn label="套餐状态" >
              <template slot-scope="scope">
                  <i v-if="scope.row.state==1" class="el-icon-circle-check" style="color: green">已上架</i>
                  <i v-else-if="scope.row.state==2" class="el-icon-circle-close">已下架</i>
              </template>
              </ElTableColumn>
        </el-table>
    </div>
</template>

<script>
import searchComboName from '../../components/Search/Search_ComboName.vue'
export default {
    components:{searchComboName},
    data(){
        return{
            payComboName:'',
            payComboList:[],
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$axios.get("/api/manager-get-payCombo",{
                params:{
                    pageNum:1,
                }
            }).then(res=>{
                this.payComboList = res.data.list;
            })
        }
    }
}
</script>

<style>

</style>
