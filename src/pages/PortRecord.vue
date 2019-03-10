<template>
    <div>
        <el-row style="margin-bottom:30px">
            <selectProject ref="selectProject"/>
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
                <portPie/>
            </el-col>
        </el-row>
        <div> <div v-if="flag==true"  class="numberWapper">车牌号码：{{plateNum}}<el-button type="mini" @click="changePlateNum()">纠错</el-button></div>
            <div style="margin-left:20% ;display: flex;" v-else><el-input class="numberWapper2" v-model="plateNum" placeholder="请输入车牌号码"></el-input><el-button style="margin-left:10%" type="primary">确定</el-button><el-button type="info" @click="cancel()">取消</el-button></div>
        </div>
        <el-row>
            <el-card>
                
            </el-card>
        </el-row>
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
        this.getPortRecord();
    },
    methods:{
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

                var index = res.data.processFlag;
                for(var i=0;i<4;i++){
                    if(i<index)
                        this.activities2[i].color = '#0bbd87';   
                    else{
                        this.activities2[i].color = '#00000';
                    }
                    this.activities2[i].icon = null;
                }
                this.activities2[index].icon='el-icon-check'; 
                this.activities2[index].color = '#409EFF';
                this.plateNum = res.data.plate_number;
            })
        },
        changePlateNum(){
            this.flag=false;
            this.temp=this.plateNum;
        },  
        cancel(){
            this.flag=true;
            this.plateNum=this.temp;
        },
        alterPortNum(){
            this.$axios.post("/aip/alter-port-record-plateNum",{
                plateNum:this.plateNum,
            }).then(res=>{
                
            })
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

