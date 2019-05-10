<template>
    <div>
        <el-row style="margin:20px">
                    <div v-if="parkingRecordList.length!=0">
                        <el-col  :offset="1" v-for="index in parkingRecordList " class="shadow" :key="index.id">
                           <el-card :body-style="{ padding: '0px' }">
                               <div class="header1"><span>{{index.project_name}}</span></div>
                            <img src="../assets/logo.png" height="150px" style="width:88%; }"/>
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                <time class="time" style="border-bottom:2px dashed #ff0000">套餐：<span v-if="index.combo_name!=null">{{index.combo_name}}</span><span v-else>无 </span><p/></time>
                                <time class="time" >入场时间：{{index.in_time}}<p/></time>
                                <time class="time" >出场时间：{{index.out_time}}<p/></time>
                                <span class="time" >{{index.plate_number}}</span>
                                <el-button type="text" class="button" >操作按钮</el-button>
                                </div>
                            </div>
                            </el-card>          
                        </el-col>
                    </div>
                    <div v-else> 暂无数据</div>
            </el-row>
           
    </div>
</template>
<script>

export default {
   data(){
    return{
        parkingRecordList:[],

    }
   },
   methods:{
       getRecord(state,pageNum){
          this.$axios.get("/api/get-parkingRecord",{
                params:{
                    state:state,
                    pageNum:pageNum,
                }}).then(res=>{
                    this.parkingRecordList = res.data.list; 
                    this.$emit('alterTotal', res.data.pages*10);
                    console.log(this.parkingRecordList)
                })
       },
       searchByTime(state,startDate,endDate,pageNum){
           this.$axios.get("/api/get-parkingRecord",{
               params:{
                   state:state,
                   pageNum:pageNum,
                   start_Date: startDate,
                   end_Date:endDate
               }
           }).then(res=>{
               this.parkingRecordList = res.data.list;
               this.$emit('alterTotal', res.data.pages*10);
           })
       }
     
   }

}
</script>

<style>
.shadow{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-bottom: 20px;
    width: 20%;
    height: 100%;
    top: 20px;
}
.shadow:hover{
background-image: linear-gradient(176deg, #EAC9C9 0%, #FFFFFF 100%)

}
.header1{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom:2px dashed #ff572294;
   
}
.font{
    font-size: 1.3vw;
    
}
 .time {
    font-size: 13px;
    color: #999;
    
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
        padding: 0;
        float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>
