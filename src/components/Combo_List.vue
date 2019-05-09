<template>
    <div>
        <el-row>
            <el-col :span="6" :offset="5">
                <SearchComboName ref="nameSearch"/>
            </el-col>
            <el-col :span="6" :offset="1"><SearchProjectName ref="projectSearch"/></el-col>
            <el-col :span="2" :offset="1"><el-button type="primary" @click="search()" >搜索</el-button></el-col>
            <el-col :span="1" ><el-button type="primary" @click="reset()" >重置</el-button></el-col>
        </el-row>
        <el-row>
        <el-table
        :data="payComboList"
        style="width: 100%">
        <el-table-column
            prop="combo_id"
            label="套餐编号">
        </el-table-column>
        <el-table-column
            prop="combo_name"
            label="套餐名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="project_name"
            label="停车场项目"
            width="180">
        </el-table-column>
        <el-table-column
            prop="effective_length"
            label="有效时长"
            width="100">
            <template slot-scope="scope">{{scope.row.effective_length}}个月</template>
        </el-table-column>
        <el-table-column prop="money" label="套餐价格" width="100">
            <template slot-scope="scope">{{scope.row.money}}元</template>
        </el-table-column>
        <el-table-column
            prop="start_time"
            label="生效时间">
        </el-table-column>
        <el-table-column
            prop="end_time"
            label="失效时间">
        </el-table-column>
        <el-table-column
            prop="manager_name"
            label="管理员">    
        </el-table-column>
        <el-table-column label="操作" >
            <template slot-scope="scope">
                <el-button @click="showDialog(scope.row)">修改</el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        </el-row>



        <div class="">
        <el-dialog  title="修改套餐"  :visible.sync="dialogFormVisible" >
                <el-form >
                    <el-form-item label="套餐名称" >
                    <el-input v-model="comboName"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时长" >
                        <el-input v-model="effectLength"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐价格" >
                        <el-input v-model="money" style="width: 111px"></el-input>&nbsp;元
                    </el-form-item >
                    <el-form-item label="套餐开始时间">
                      <el-date-picker
                        v-model="start_time"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker></el-form-item>
                    <el-form-item label="套餐结束时间" >
                        <el-date-picker
                        v-model="end_time"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="postEdit()">确 定</el-button>
            </div>
        </el-dialog></div>
    </div>
        

</template>
<script>
import SearchComboName from '../components/Search_Combo_Name.vue';
import SearchProjectName from '../components/Search_Project_Name.vue';

export default{
    components:{SearchComboName,SearchProjectName},
    data(){
        return{
            pageNum:1,
            payComboList:[],
            dialogFormVisible:false,
            temp_ComboId:'',
            comboName:'',
            effectLength:'',
            money:'',
            start_time:'',
            end_time:'',
            value:'',
            temp:[],
        }
    },
    mounted(){
        this.getPayComboList();
    },
    methods:{
        getPayComboList(){
            this.$axios.get("/api/get-paycomboList",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:10,
                }
            }).then(res=>{
                this.payComboList=res.data.list;
            })
        },
        handleDelete(payComboData){  
            this.$confirm('此套餐为通用套餐，一经修改所有项目同时修改', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            let postData = this.$qs.stringify({
                combo_id:payComboData.combo_id,
            });
            this.$axios({
            url:'/api/delete-paycombo',
                method: 'post',
                data: postData,
                headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
            }).then(res=>{
                this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
                });
                this.getPayComboList();
            })
            })
        },
        showDialog(payComboData){
            this.comboName = payComboData.combo_name;
            this.combo_id = payComboData.combo_id;
            this.effectLength = payComboData.effective_length;
            this.money = payComboData.money;
            this.start_time = new Date(payComboData.start_time);
            this.end_time = new Date(payComboData.end_time);
            this.dialogFormVisible = true;
            this.temp_ComboId = payComboData.combo_id;        
            this.temp.push(this.comboName,this.effectLength,this.money,this.start_time,this.end_time);


        },
        postEdit(){ 
            if(this.temp[0]==this.comboName&&this.temp[1]==this.effectLength&&this.temp[2]==this.money&&this.temp[3].getTime()==this.start_time.getTime()&&this.temp[4].getTime()==this.end_time.getTime()){
                this.$message.warning('没有填入修改内容，修改失败');
            }else if(this.effectLength>12){
                this.$message.error('套餐时长不能超过12个月');
            }else if(this.start_time>this.end_time){
                this.$message.error('开始时间不能大于结束时间');
            }
            else{
                this.$axios.post("/api/edit-paycombo",{
                combo_id:this.combo_id,combo_name:this.comboName,money:this.money,effective_length:this.effectLength,start_time:this.start_time,end_time:this.end_time,
            }).then(res=>{
                this.$message({message: '修改成功',type: 'success'});
                this.getPayComboList();
                this.temp.length=0;
                this.temp.push(this.comboName,this.effectLength,this.money,this.start_time,this.end_time);
            })
            this.dialogFormVisible=false;
            }
        },
        search(){
            this.$axios.get("/api/search-combo-byName",{
                params:{
                    combo_name:(this.$refs.nameSearch.combo_name),
                    project_name:(this.$refs.projectSearch.project_name),
                    pageNum:1,
                    pageSize:10,
                }}).then(res=>{
                    this.payComboList = res.data.list;
                })
        },
        reset(){
            this.$refs.nameSearch.combo_name='';
            this.$refs.projectSearch.project_name='';
            this.search();
        }

    }
}
</script>
<style>
.el-form-item{
    margin: 10px;
}
.el-dialog{
    
    
}
</style>
