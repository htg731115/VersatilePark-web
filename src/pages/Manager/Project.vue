<template>
    <div style="margin-top:40px">
        <el-card>
            <el-row>
                <el-col :span="4">        
                    项目名称：
                </el-col>
                
            </el-row>
        </el-card>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            projectData:[],
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$axios.get('/api/manager-getProject',{
                params:{
                    adminId:this.$store.state.userId 
                }
            }).then(res=>{
                this.projectData = res.data;
            })
        }
    }
}
</script>

<style>

</style>
