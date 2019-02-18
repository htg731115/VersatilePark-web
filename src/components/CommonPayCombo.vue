<template>
<div>
    <el-row>
        <el-col>
            <h1>该套餐默认适用于所有停车场</h1>
        </el-col>
        <el-col :span="3" :offset="2">
            <img src="../assets/pic.png" width="100%"/>
        </el-col>
        <el-col :span="6" :offset="3" class="comPayCombo_wapper"  >
            <el-col class="comPayCombo_item">
                <el-col :span="8" :offset="3">套餐名称：</el-col><el-col :span="8"><el-input  v-if="edit" v-model="comboName" size="medium"/>
                <span v-else>{{comboName}}</span></el-col>
            </el-col>
            <el-col class="comPayCombo_item">
                <el-col :span="8" :offset="3">套餐有效时长：</el-col><el-col :span="8"><el-input  v-if="edit" v-model="effectLength" size="medium"/>
                <span v-else>{{effectLength}}个月</span></el-col>
            </el-col>
            <el-col class="comPayCombo_item">
                 <el-col :span="8" :offset="3">套餐价格：</el-col><el-col :span="8"><el-input  v-if="edit" v-model="money" size="medium"/>
                <span v-else>{{money}}元</span></el-col>
            </el-col>
            <el-button v-if="edit" type="success" plain @click="editComPayCombo()">确认修改</el-button>
            <el-button v-else type="primary" plain @click="edit=!edit">修改通用套餐</el-button>
        </el-col>

    </el-row>
</div>
</template>
<script>
export default{
    data(){
        return{
            tempdata:[],
            edit:0,
            comboName:'',
            money:'',
            effectLength:'',
        }
    },
    mounted(){
        this.getCombo();
    },
    methods:{
        getCombo(){
            this.$axios.get("/api/getcompaycombo").then(res=>{
                this.money=res.data.money;
                this.comboName=res.data.combo_name;
                this.effectLength=res.data.effective_length;
            })
        },
        editComPayCombo(){
            this.$confirm('此套餐为通用套餐，一经修改所有项目同时修改', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$axios.post("/api/editcompaycombo",{
                comboName:this.comboName,money:this.money,effectLength:this.effectLength
            }).then(res=>{
                 this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            });
           
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
            this.edit=!this.edit;
        }
    }
}
</script>
<style>
.comPayCombo_wapper{
    margin-top: 0.5vw;
}
.comPayCombo_item{
    padding-bottom: 1vw;
    height: 47px;
    font-size: 17px;
}
</style>