<template>
    <div>
        <el-table
        :data="payComboList"
        style="width: 100%">
        <el-table-column
            prop="combo_id"
            label="套餐编号"
            width="180">
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
            width="180">
            <template slot-scope="scope">{{scope.row.effective_length}}个月</template>
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
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="showDialog(scope.row)"></el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <el-dialog title="修改套餐" :visible.sync="dialogFormVisible" >
            <el-row ><el-col :span="8" >
                <el-form >
                    <el-form-item label="套餐名称" >
                    <el-input v-model="comboName"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时长" >
                        <el-input v-model="effectLength"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐价格" >
                        <el-input v-model="money"></el-input>
                    </el-form-item>
                      <el-date-picker
                        v-model="start_time"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    <el-form-item label="套餐结束时间" >
                        <el-date-picker
                        v-model="end_time"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col></el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="postEdit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
        

</template>
<script>
export default{
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
        button(a,b){
            console.log(a+"??");
            console.log(b);
            
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
            console.log(payComboData.combo_name)
            this.comboName = payComboData.combo_name;
            this.combo_id = payComboData.combo_id;
            this.effectLength = payComboData.effective_length;
            this.money = payComboData.money;
            this.start_time = new Date(payComboData.start_time);
            this.end_time = payComboData.end_time;
            this.dialogFormVisible = true;
            this.temp_ComboId = payComboData.combo_id;

        },
        postEdit(){ 
            this.$axios.post("/api/edit-paycombo",{
                combo_name:this.combo_id,money:this.money,effective_length:this.effectLength
            })
            this.dialogFormVisible=false;
        }

    }
}
</script>
<style>
</style>
