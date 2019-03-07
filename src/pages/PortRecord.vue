<template>
    <div>
        <el-row style="margin-bottom:30px">
            <selectProject ref="selectProject"/>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="2">
                <el-card >
                    <img src="../assets/timg.jpg" style="width:100%"/>
                </el-card>
            </el-col>
            <el-col :span="5">
                  <el-timeline>
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
        </el-row>
    </div>    
</template>
<script>
import selectProject from "../components/Select/Select_Project.vue";
export default {
    components:{selectProject},
    data(){
        return {
            activities2: [{
                content: '识别车牌',
                timestamp: '2018-02-12 20:46',
                size: 'large',
                type: 'primary',
                }, {
                content: '车辆入场',
                timestamp: '2018-04-03 20:46',
                }, {
                content: '车辆出场',
                timestamp: '2018-04-03 20:46',
                size: 'large'
                }, {
                content: '流程正常结束',
                timestamp: '2018-04-03 20:46'
                }]
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
                this.activities2.forEach(element => {
                    element.color = '#00000';
                });
                this.activities2[index].icon='el-icon-more'; 
                console.log(this.activities2);
            })
        }
    }
}
</script>
<style>

</style>

