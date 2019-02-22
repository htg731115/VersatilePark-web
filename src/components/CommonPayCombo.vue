<template>
<div>
    <el-row>
        <el-col :span="20">
            <h1>该套餐默认适用于所有停车场</h1>
        </el-col>
        <el-col :span="3" :offset="2">
            <img src="../assets/pic.png" width="100%"/>
        </el-col>
        <el-col :span="8" :offset="2" class="comPayCombo_wapper"  >
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
            <el-button v-if="edit" type="danger" plain @click="returnTemp()">取消</el-button>
            <el-button v-else type="primary" plain @click="edit=!edit">修改通用套餐</el-button>
        </el-col>
        
        <el-col :span="7" :offset="1">        
            <el-card shadow="hover">
                <div v-for="(item,index) in logData" :key="item.index" style="margin-bottom: 6px; float:left;">
                    <el-radio v-model="radio" :label=index >套餐名称：{{item.log_combo_name}}，时长：{{item.log_effective_length}},金额：{{item.log_money}}<br/><span style="color:red;">修改时间：{{item.alter_time}}</span> </el-radio>
                </div>
            </el-card>
        </el-col>
        <div class="log_relative">近期六次修改记录</div>
    </el-row>
   <el-row style="margin-top: 2vw;">
       <el-button type="primary" plain @click="pushDefault()">写入默认套餐参数</el-button>
       <el-button type="success" plain @click="pushLogCombo(radio)">写入已选记录</el-button>
       <el-button type="warning" plain @click="radio=-1">清空已选项</el-button>
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
            radio:"",
        }
    },
    mounted(){
        this.getCombo();
        this.getLog();
        
    },
    methods:{
        getCombo(){
            this.$axios.get("/api/getcompaycombo",).then(res=>{
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
                console.log(this.effectLength);
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
                    this.logData.length=0;
                    this.getLog();
                    this.getCombo();
                    
                });
                }).catch(() => {
                    this.returnTemp();
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.edit=false;          
                });
            }
        },
        getLog(){
            this.$axios.get("/api/get-log-paycombo",{
                params:{
                    combo_id:1
                }
            }).then(res=>{
                console.log(res.data.combo_name)
                
                res.data.forEach(element => {
                    const arr  =
                    {
                        id : element.id,
                        log_combo_name : element.combo_name,
                        log_effective_length : element.effective_length,
                        log_money : element.money,
                        alter_time : element.alter_time
                    }
                    this.logData.push(arr);
                });
                          
            })
        },
        returnTemp(){
            this.money=this.temp_money;
            this.comboName=this.temp_comboName;
            this.effectLength=this.temp_effectLength;
            console.log(this.edit);
            this.edit=false;
        },
        pushDefault(){
            this.$axios.get("/api/get-default-paycombo").then(res=>{
                this.money=res.data.money;
                this.comboName=res.data.combo_name;
                this.effectLength=res.data.effective_length;
                this.edit=true;
            })
        },
        pushLogCombo(index){
            if(index>=0){
                this.comboName=this.logData[index].log_combo_name;
                this.effectLength=this.logData[index].log_effective_length;
                this.money=this.logData[index].log_money;
                this.edit=true;
            }else{
                this.$message.warning('你没有选择一条旧的记录，因此无法读取');                
            }
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
.log_relative{
    position: relative;
    top: 2vw;
    right: 8vw;
    font-size: 1.5vw;
}
.el-radio{
    float: left;
    text-align: left
}
.el-radio__input{
    float: left;
}

</style>