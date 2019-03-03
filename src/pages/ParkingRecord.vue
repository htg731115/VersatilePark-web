<template>
    <div>
    
        <el-row style="margin-top:20px ;">
            <el-col :span="13">
          <el-button type="text" style="font-size:20px;"  @click="get()">未出场车辆</el-button>
                    <el-button type="text" style="font-size:20px;" v-bind:class="{changeColor:temp3}" @click="getAll()">所有车辆记录</el-button>
          <el-button type="text" style="font-size:20px;" v-bind:class="{changeColor:temp}" @click="getNotOut()">未出场车辆</el-button>
          <el-button type="text" style="font-size:20px"  v-bind:class="{changeColor:temp2}" @click="getOut()">已出场车辆</el-button></el-col> 
        <el-col :span="7"><TimePicker ref="timePicker"/></el-col>
        <el-col :span="2"><el-button @click="searchByTime()">筛选</el-button></el-col>
        </el-row>
            <ParkingRecordCard ref="ParkingRecordCard" />
                    
    </div>
</template>

<script>
import ParkingRecordCard from '../components/Parking_Record_Card.vue';
import TimePicker from '../components/Picker/Time_Picker.vue';
export default {
    components:{ParkingRecordCard,TimePicker},
    data(){
        return{
            a:[false,false],
            temp:true,
            temp2:true,
            temp3:false,
         }
    },
    mounted(){
        this.getRecordData();
    },
    methods:{
        getRecordData(){
            this.$refs.ParkingRecordCard.getRecord(0,1);
            
        },
        get(){
            console.log(this.$refs.ParkingRecordCard.parkingRecordList);
            console.log(this.$refs.timePicker.value7)
        },
        getAll(){
            this.temp3=false;
            this.temp2=true;
            this.temp=true;
            this.getRecordData();
        },
        getNotOut(){
            this.temp=false;
            this.temp2=true;
            this.temp3=true;
            this.$refs.ParkingRecordCard.getRecord(1,1);
        },
        getOut(){
            this.temp=true;
            this.temp2=false;
            this.temp3=true;
            this.$refs.ParkingRecordCard.getRecord(2,1);
        },
        searchByTime(){
            var state = 0;
            if(this.temp == false)
                state = 1;
            else if(this.temp2 == false)
                state = 2;  
            if(this.$refs.timePicker.time!=null)
                this.$refs.ParkingRecordCard.searchByTime(state,this.$refs.timePicker.time[0],this.$refs.timePicker.time[1],1);
            else
                this.$refs.ParkingRecordCard.getRecord(state,1);
        }
    }
}
</script>

<style>
.changeColor{
    color: #999;
    font-size:100px;
}
</style>

