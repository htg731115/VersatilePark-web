<template>
    <div>
          <el-table
                :data="evaluationDate"
                height="500"
                border>
                <el-table-column prop="create_time" label="评价时间" />
                
                <el-table-column prop="customer_id" label="用户名" width="80" />
                <el-table-column prop="degress" label="满意度" width="148">
                    <template slot-scope="scope">
                    <el-tag  v-if="scope.row.degress==1" type="success">好评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==2" type="warning ">中评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==3" type="danger">差评</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="handler_status" label="处理状态" />
                <el-table-column prop="content" label="评价描述" />
                <el-table-column >
                    <template slot-scope="scope">
                        <el-button @click="handle(scope.id)">处理</el-button>
                    </template>
                </el-table-column>
                </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            evaluationDate:[],
        }
    },
    mounted(){
        this.searchById(this.$store.state.projectId);
    },
    methods:{
         searchById(project_id){
             console.log(this.$store);
            this.$axios.get("/api/search-evalbyid",{
                params:{
                    pageNum:1,
                    project_id:project_id,
                }
            }).then(res=>{
                this.evaluationDate=res.data.list;
            })
        },
        handle(evaluationId){
             //显示
        }
    }
}
</script>

<style>

</style>
