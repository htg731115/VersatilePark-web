<template>
    <div>  
        <el-row style="margin-top:20px;margin-bottom:20px">
            <el-col :span="4">
            <searchComboName ref="searchComboName"/>
            </el-col>
            <el-col :span="3">
                <el-button @click="search()">搜索</el-button>
            </el-col>
            <el-col :span="3" :offset="12">
                <el-button type="primary" @click="showDialog2()">新增</el-button>
            </el-col>
        </el-row>
        <el-table :data="payComboList" style="height:650px">
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
          <ElTableColumn label="操作">
              <template slot-scope="scope">
                  <el-button type="text" @click="showDialog(scope.row)">编辑</el-button>
                  <el-button type="text" v-if="scope.row.state==2" @click="sell(scope.row)" >上架</el-button>
                  <el-button type="text" v-else-if="scope.row.state==1" disabled @click="sell(scope.row)" >上架</el-button>
                  <el-button type="text" v-if="scope.row.state==1" @click="unsell(scope.row)">下架</el-button>
                  <el-button type="text" v-else-if="scope.row.state==2" disabled @click="unsell(scope.row)">下架</el-button> 
                  <el-button type="text" v-if="scope.row.state==1" disabled >删除</el-button> 
                  <el-button type="text" v-else-if="scope.row.state==2" @click="deletePayCombo(scope.row)" >删除</el-button> 
              </template>
          </ElTableColumn>
        </el-table>
        
        <el-dialog title="修改套餐"  :visible.sync="dialogFormVisible" >
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
                    <el-button @click="dialogFormVisible = false,addFlag = false">取 消</el-button>
                    
                    <el-button v-if="addFlag == false" type="primary" @click="postEdit()">确 定</el-button>
                    <el-button v-else type="primary" @click="addPayCombo()">确定</el-button>
                </div>
        </el-dialog>
          <el-pagination
            @current-change="search"
            :current-page.sync="pageNum"
            background
            layout="prev, pager, next, jumper"
            :total="total">
         </el-pagination>
    </div>
</template>

<script>
import searchComboName from '../../components/Search/Search_ComboName.vue'
import pagination from '../../components/Pagination.vue'
export default {
    components:{searchComboName,pagination},
    data(){
        return{
            payComboName:'',
            payComboList:[],
            dialogFormVisible:false,
            comboName:'',
            effectLength:'',
            money:'',
            start_time:'',
            end_time:'',
            temp:[],
            combo_id:'',
            addFlag: false,
            pageNum:1,
            total:10       
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$axios.get("/api/manager-get-payCombo",{
                params:{
                    pageNum:this.pageNum,
                }
            }).then(res=>{
                this.payComboList = res.data.list;
                this.total = res.data.pages*10;
            })
        },
        sell(payCombo){
            let postData = this.$qs.stringify({
                comboId:payCombo.combo_id
            })
            this.$axios.post("/api/paycombo-sell",postData).then(res=>{
                if(res.data==true){
                    this.$message.success("上架成功")
                    this.init();
                }
                else{
                    this.$message.info("上架失败，已存在上架的套餐请先下架")
                }
            })
        },
        unsell(payCombo){
            let postData = this.$qs.stringify({
                comboId:payCombo.combo_id
            })
            this.$axios.post("/api/paycombo-unsell",postData).then(res=>{
                this.$message.success("下架成功");
                this.init();
            })
        },
        showDialog(payCombo){
            if(payCombo.state == 1){
                this.$message.error("该套餐目前处于上架状态无法编辑")
            }else{
                this.dialogFormVisible = true;
                this.comboName = payCombo.combo_name;
                this.start_time = new Date(payCombo.start_time);
                this.end_time = new Date(payCombo.end_time);
                this.effectLength = payCombo.effective_length;
                this.money = payCombo.money;
                this.combo_id = payCombo.combo_id;
                this.temp.push(this.comboName,this.effectLength,this.money,this.start_time,this.end_time);
            }
        },
        showDialog2(){
            this.addFlag = true;
            this.dialogFormVisible = true;
        },
        postEdit(){
            if(this.temp[0]==this.comboName&&this.temp[1]==this.effectLength&&this.temp[2]==this.money&&this.temp[3].getTime()==this.start_time.getTime()&&this.temp[4].getTime()==this.end_time.getTime()){
                this.$message.warning('没有填入修改内容，修改失败');
            }else if(this.effectLength>12){
                this.$message.error('套餐时长不能超过12个月');
            }else if(this.start_time>this.end_time){
                this.$message.error('开始时间不能大于结束时间');
            }else{
                this.$axios.post("/api/edit-paycombo",{
                    combo_id:this.combo_id,combo_name:this.comboName,money:this.money,effective_length:this.effectLength,start_time:this.start_time,end_time:this.end_time,
                }).then(res=>{
                    this.$message({message: '修改成功',type: 'success'});
                    this.init();
                    this.temp.length=0;
                    this.temp.push(this.comboName,this.effectLength,this.money,this.start_time,this.end_time);
                })
            }     
        },
        search(){
            this.$axios.get("/api/manager-search-payCombo",{
                params:{
                    pageNum:this.pageNum,
                    comboName:this.$refs.searchComboName.comboName
                }
            }).then(res=>{
                this.payComboList = res.data.list;
                this.total = res.data.pages*10;
            })
        },
        addPayCombo(){
            this.$axios.post("/api/manager-add-payCombo",{
                    combo_name:this.comboName,money:this.money,effective_length:this.effectLength,start_time:this.start_time,end_time:this.end_time
            }).then(res=>{
                this.dialogFormVisible = false;
                this.$message.success("添加成功");
                this.init();
            })
        },
        deletePayCombo(payCombo){
            let postData = this.$qs.stringify({
                combo_id:payCombo.combo_id
            })
            this.$axios.post("/api/delete-paycombo",postData).then(res=>{
                this.$message.success("删除成功");
                this.init();
            })
        }
    }
}
</script>

<style>
</style>
