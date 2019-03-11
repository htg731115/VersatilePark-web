<template>
    <div>
        <el-row style="margin-bottom:30px;margin-top:30px">
            <el-col :span="5">
            <selectProject ref="selectProject" @changeProject="changeSelect" @success="init"/>
            
            </el-col><el-col :span="5"><el-button @click="dialogFormVisible = true">强制开闸</el-button></el-col>
        </el-row>
        <el-row>
            <el-col :span="10" >
                <el-card >
                    <img src="../assets/timg.jpg" style="width:100%"/>
                </el-card>
            </el-col>
            <el-col :span="5">
                  <el-timeline style="margin-top: 33%;">
                    <el-timeline-item
                    v-for="(activity, index) in activities2"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-col>
            <el-col :span="8">
                <portPie ref="portPie"/>
            </el-col>
        </el-row>
        <div> <div v-if="flag==true"  class="numberWapper">车牌号码：{{plateNum}}<el-button type="mini" @click="changePlateNum()">纠错</el-button> </div>
            <div style="margin-left:20% ;display: flex;" v-else><el-input class="numberWapper2" v-model="plateNum" placeholder="请输入车牌号码"></el-input><el-button style="margin-left:10%" @click="alterPortNum()" type="primary">确定</el-button><el-button type="info" @click="cancel()">取消</el-button></div>
        </div>
        
        <el-row>
            <el-card>
                
            </el-card>
        </el-row>

            <el-dialog title="输入开闸理由"  :visible.sync="dialogFormVisible" >
                <el-input type="textarea" v-model="reason" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="openPort()">确 定</el-button>
            </div>
            </el-dialog>
    </div>    

</template>
<script>
import selectProject from "../components/Select/Select_Project.vue";
import portPie from "../components/echart/portPie.vue";
export default {
    components:{selectProject,portPie},
    data(){
        return {
            plateNum:'',
            temp:null,
            recordId:null,
            reason:"",
            dialogFormVisible:false,
            processFlag:0,
            activities2: [{
                content: '车辆入场识别',
                timestamp: '2018-02-12 20:46',
                size: 'large',
                type: 'primary',
                }, {
                content: '车辆入场',
                timestamp: '2018-04-03 20:46',
                size: 'large',
                }, {
                content: '车辆出场识别',
                timestamp: '2018-04-03 20:46',
                size: 'large'
                }, {
                content: '车辆出场',
                timestamp: '2018-04-03 20:46',
                size: 'large',
                }],
            flag:true,
        }
    },
    mounted(){
    },
    methods:{
        init(){
            this.getPortRecord();
            this.$refs.portPie.getFreeParking(this.$refs.selectProject.selectProject);
        },
        getPortRecord(){
            this.$axios.get('/api/get-port-record',{
                params:{
                    projectId:this.$refs.selectProject.selectProject,
                }
            }).then(res=>{
                this.activities2[0].timestamp = res.data.read_in_time;//入场时间
                this.activities2[1].timestamp = res.data.in_time;
                this.activities2[2].timestamp = res.data.read_out_time;
                this.activities2[3].timestamp = res.data.out_time;

                this.processFlag = res.data.processFlag;
                for(var i=0;i<4;i++){
                    if(i<this.processFlag)
                        this.activities2[i].color = '#0bbd87';   
                    else{
                        this.activities2[i].color = '#00000';
                    }
                    this.activities2[i].icon = null;
                }
                this.activities2[this.processFlag].icon='el-icon-check'; 
                this.activities2[this.processFlag].color = '#409EFF';
                this.plateNum = res.data.plate_number;
                this.recordId = res.data.id;
            })
        },
        changePlateNum(){
            this.flag=false;
            this.temp=this.plateNum;
        },  
        cancel(){
            this.flag=true;
            this.plateNum=this.temp;
            this.projectId2 = this.$refs.selectProject;
        },
        alterPortNum(){
            if(this.plateNum==this.temp){
                this.$message.error("车牌号码没有变更，请输入不一样的车牌号码")
                this.plateNum = this.temp;
                this.flag = true;
            }else{
                 this.$confirm('你确定要修改该识别车牌吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                    let postData = this.$qs.stringify({
                    plateNum:this.plateNum,
                    id:this.recordId,
                    });
                    this.$axios.post("/api/alter-port-record-plateNum",postData).then(res=>{
                        this.temp = this.plateNum;
                        this.flag = true;
                    })})
            }
        },
        changeSelect(data){
            this.init();
        },
        openPort(reason){
            var text;
            if(this.processFlag == 3){
                this.$message.error("该车辆已经出场无法开闸")
            }
            else{
                if(this.processFlag!=2){
                    text = "目前该车辆未处于出场识别状态，您执意要进行开闸操作吗";
                }else{
                    text = "您确定要执行开闸操作吗";
                }
                this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$axios.post("/api/")
                })
            }
        }
    }
}
</script>
<style>
.numberWapper{
   margin-left: 20%;
    font-size: 30px;
    display: flex;
    align-items: center;

}
.numberWapper2{
    width: 20%;
    font-size: 30px
}
</style>

