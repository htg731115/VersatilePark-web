<template>
    <div style="margin-top:40px">
        <el-card class="card" style="font-size:20px">
            <el-row class="item_Wapper">
                <el-col :span="3" :offset="3">        
                    项目ID：</el-col> <el-col :span="5"><span>{{projectData.id}}</span>
                </el-col>
                <el-col :span="3">
                    项目名称：</el-col><el-col :span="5"><el-input  size="small" v-model="projectData.name" v-if="changeFlag"/> <span v-else>{{projectData.name}}</span>
                </el-col>
            </el-row>
            <el-row class = "item_Wapper">
                <el-col :span="3" :offset="3">        
                    项目地址:</el-col><el-col :span="10"><el-input size="small" v-model="projectData.address" v-if="changeFlag"/> <span v-else> {{projectData.address}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" :offset="3">
                    项目开业时间:</el-col><el-col :span="10"><el-input size="small" v-if="changeFlag"/> <span v-else>{{projectData.opentime}}</span>
                </el-col>
            </el-row>   
            <el-row class = "item_Wapper">
                <el-col :span="3" :offset="3">   
                    项目面积:</el-col><el-col :span="5"><el-input size="small" v-model="projectData.area" v-if="changeFlag"/><span v-else> {{projectData.area}}平方米</span>
                </el-col>
                <el-col :span="3" :offset="3">
                    运营状态：</el-col><el-col :span="5"><el-input size="small" v-model="projectData.state" v-if="changeFlag"/><span v-else>{{projectData.state}}</span>
                </el-col>
            </el-row>
            <el-row class = "item_Wapper">
                <el-col :span="3" :offset="3">   
                    总车位数:</el-col><el-col :span="5"><span > {{projectData.total_num}}位</span>
                </el-col>
                <el-col :span="3" :offset="3">
                    运营车位数：</el-col><el-col :span="5"><el-input size="small" v-model="projectData.manage_num" v-if="changeFlag"/><span v-else>{{projectData.manage_num}}位</span>
                </el-col>
            </el-row>
            <el-row class = "item_Wapper">
                <el-col>
                    <el-button v-if="changeFlag==true" type="success" plain @click="editProject()">确认修改</el-button>
                    <el-button v-if="changeFlag==true" type="danger" plain @click="returnTemp()">取消</el-button>
                    <el-button v-else @click="changeProject()">
                        修改项目信息
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-row style="font-size:25px; margin-top:40px">
            <el-col :span="4" >
                开业至今已
            </el-col>
            <el-col :offset="2"  :span="widthSpan" style="background:#c23531;color:white">
                {{result}}天
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            projectData:[],
            changeFlag:false,
            tempData:[],
            widthSpan:3,
            result:0,
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.initProject();
        },
        initProject(){
            this.$axios.get('/api/manager-getProject',{
                params:{
                    adminId:this.$store.state.userId 
                }
            }).then(res=>{
                this.projectData = res.data;
                var sDate = Date.parse(new Date(this.projectData.opentime));
                var myDate = new Date();
                var usedTime = myDate - sDate;  //两个时间戳相差的毫秒数
	            var days=Math.floor(usedTime/(24*3600*1000));
                this.result =days;
                if(days<50){
                    this.widthSpan = 3;
                }else if(days<100){
                    this.widthSpan = 6;
                }else if(days<200){
                    this.widthSpan = 10;
                }
            })
        },
        changeProject(){
            this.changeFlag = !this.changeFlag;
            this.tempData.name = this.projectData.name;
            this.tempData.address = this.projectData.address;
            this.tempData.area = this.projectData.area;
            this.tempData.state = this.projectData.state;
            this.tempData.manage_num = this.projectData.manage_num;
        },
        returnTemp(){
            this.projectData.name = this.tempData.name;
            this.projectData.address = this.tempData.address;
            this.projectData.area = this.tempData.area;
            this.projectData.state = this.tempData.state;
            this.projectData.manage_num = this.tempData.manage_num;
            this.changeFlag =!this.changeFlag;
        },
        editProject(){
            let postData = this.$qs.stringify({
                projectId:this.projectData.id,
                name:this.projectData.name,
                address:this.projectData.address,
                area:this.projectData.area,
                manageNum:this.projectData.manage_num,
            })
            console.log(postData);
            this.$axios.post("/api/editProject",postData).then(res=>{
                this.$message.success("恭喜你修改成功");
                this.changeFlag = !this.changeFlag;
            })
        },

        
    }
}
</script>

<style>
.item_Wapper{
    margin: 30px;
}
.card{
    transition: background-color 1s,color .3s;
}
.card:hover{
    background-color:#8f7a7a2e;
}
</style>
