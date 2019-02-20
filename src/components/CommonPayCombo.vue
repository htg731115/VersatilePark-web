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
        <el-col :span="7" :offset="2">
            <el-card>
                <div v-for="item in logData" :key="item.index">
                    <el-radio v-model="radio" :label=item.id >套餐名称：{{item.log_combo_name}}，时长：{{item.log_effective_length}},金额：{{item.log_money}} </el-radio>
                </div>
            </el-card>
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
            temp_effectLength:'',
            temp_comboName:'',
            temp_money:'',
            logData:[],
            radio:[],
        }
    },
    mounted(){
        this.getCombo();
        this.getLog();
        
    },
    methods:{
        getCombo(){
            this.$axios.get("/api/getcompaycombo").then(res=>{
                this.money=res.data.money;
                this.comboName=res.data.combo_name;
                this.effectLength=res.data.effective_length;
                this.temp_effectLength=this.effectLength;
                this.temp_comboName=this.comboName;
                this.temp_money=this.money;
            })   
        },
        editComPayCombo(){
            
            if(this.effectLength>12){
                this.$message.error('套餐时长不能超过12个月');
                this.edit=!this.edit;
                this.effectLength=this.temp_effectLength;
            }else if(this.comboName==this.temp_comboName&&this.money==this.temp_money&&this.effectLength==this.temp_effectLength){
                this.$message.warning('没有做出任何修改');
                this.edit=!this.edit;
            }else{
                this.$confirm('此套餐为通用套餐，一经修改所有项目同时修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$axios.post("/api/editcompaycombo",{
                    combo_name:this.comboName,money:this.money,effective_length:this.effectLength
                }).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                     this.edit=!this.edit;
                     this.getCombo();
                });
                }).catch(() => {
                    this.money=this.temp_money;
                    this.combo_name=this.temp_comboName;
                    this.effective_length=this.effective_length;
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.edit=!this.edit;          
                });
            }
        },
        getLog(){
            this.$axios.get("/api/get-log-paycombo",{
                params:{
                    combo_id:0
                }
            }).then(res=>{
                console.log(res.data.combo_name)
                
                res.data.forEach(element => {
                    const arr  =
                    {
                        id : element.id,
                        log_combo_name : element.combo_name,
                        log_effective_length : element.effective_length,
                        log_money : element.money
                    }
                    this.logData.push(arr);
                });
                
                console.log(this.logData);
                
                
            })
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