<template>
    <div>
        <el-row style="margin-top:40px">
            <el-col :span="3" :offset="5"><el-button type="primary" @click="ShowDialog=true">新增停车记录</el-button></el-col>
            <el-col :span="3" :offset="1">
            <el-button type="primary" @click="outExcel()">导出停车记录</el-button></el-col>
            </el-row>
        <el-row style="margin-top:20px">
            <el-col :span="5" ><searchPlateNumber ref="searchPlateNumber"/></el-col>
            <el-col :span="4" :offset="2"><TimePicker ref="timePicker"/> </el-col>
           <el-button @click="searchParkingRecord()">查询</el-button>
            </el-row>
            
        <el-table :data="tableData">
            <el-table-column prop="id" label="停车记录id"/>
            <el-table-column prop="plate_number" label="车牌号码"/>
            <el-table-column prop="in_time" label="入场时间"/>
            <el-table-column prop="out_time" label="车辆识别时间"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  @click="deleteParkingRecord(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

         <!-- dialog -->
    <el-dialog title="新增停车记录" :visible.sync="ShowDialog" width="30%" :v-if="ShowDialog==false" >
    <el-row>
       <el-form  label-width="70px" >
           <el-col :span="17" :offset="2">
                <el-form-item label="车牌号码">
                    <el-input  v-model="insertParkingRecordList.plateNumber" placeholder="" ></el-input>
                </el-form-item>
                <el-form-item label="入场时间">
                      <div class="block">
                            <el-date-picker   type="datetime" placeholder="入场时间"
                                align="right" v-model="insertParkingRecordList.inTime" 
                                >
                            </el-date-picker>
                        </div>
                </el-form-item>
                <el-form-item>
                <el-button v-on:click="cancel()">取 消</el-button>
                <el-button type="primary" @click="addParkingRecord()">确 定</el-button>
            </el-form-item>
           </el-col>
       </el-form>
       </el-row>
     </el-dialog>
    </div>
</template>

<script>
import searchPlateNumber from '../../components/Search/Search_PlateNumber.vue'
import TimePicker from '../../components/Picker/Time_Picker.vue';
export default {
    components:{searchPlateNumber,TimePicker},
    data(){
        return{
            tableData:[],
            pageNum:1,
            ShowDialog:false,
            insertParkingRecordList:[{
                plateNumber:'',
                inTime:'',
            }],
            
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$axios.get("/api/manager-get-parkingRecord",{
                params:{
                    adminId:this.$store.state.userId,
                    pageNum:this.pageNum,
                }
            }).then(res=>{
                
                this.tableData = res.data.list;
            })
        },
        outExcel(){
           window.open("/api/export?projectId="+this.$store.state.projectId); 
        },
        deleteParkingRecord(parkingRecordId){
          this.$confirm('此操作将删除该条停车记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let postData = this.$qs.stringify({
                parkingRecordId:parkingRecordId
            })
            this.$axios.post("/api/delete-parkingRecord",postData).then(res=>{
                this.$message.success("删除成功");
                this.init();
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        searchParkingRecord(){
            var params={
                    pageNum:1,
                    plateNumber:this.$refs.searchPlateNumber.plateNumber,
            };
            if(this.$refs.timePicker.time!=null)
            {
                params["startDate"] = this.$refs.timePicker.time[0];
                params["endDate"] = this.$refs.timePicker.time[1];
            }
            this.$axios.get("/api/search-parking-record",{
                params
                
            }).then(res=>{
                console.log(res);
                this.tableData = res.data.list;
            })
        },
        addParkingRecord(){
            let postData = this.$qs.stringify({
                plateNumber:this.insertParkingRecordList.plateNumber,
                inTime:this.insertParkingRecordList.inTime
            })
            this.$axios.post("/api/manager-add-parking-record",postData).then(res=>{

            })
        },
        cancel(){
            this.ShowDialog = false;
            this.insertParkingRecordList.plateNumber = '';
            this.insertParkingRecordList.inTime = '';
        }

    }
}
</script>

<style>

</style>
