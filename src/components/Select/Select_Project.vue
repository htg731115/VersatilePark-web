<template>
    <div>
    <el-select v-model="selectProject" placeholder="请选择"> 
        <el-option v-for="item in projectList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
    </div>
</template>
<script>
export default {
    data(){
        return{
            projectList:[],
            selectProject:null,
        }
    },
    mounted(){
        this.initSelectProject();
    },
    methods:{
        initSelectProject(){
            this.$axios.get('/api/getallproject').then(res=>{
                this.projectList=res.data;
            })
        }
    }
}
</script>

<style>

</style>
