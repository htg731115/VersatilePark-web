<template>
  <div >
    <el-card class="body">
      <el-row>
        <el-col :span="8" :offset="1">
          <el-card>
           <img src="../assets/timg.jpg" style="width:100%"></img>
          </el-card>
        </el-col>
        <el-col :span="15">
          <el-row>
            <el-col class="M_head" :span="10" :offset="8">
              <h3>员工编号:{{this.message.id}}</h3>
            </el-col>
          </el-row>
          <div class="dataView">
          <el-row>
            <el-col :span="3" :offset="5"><h2>姓名：</h2></el-col>
            <el-col :span="4" :offset="2"><h2>{{this.message.name}}</h2></el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="5"><h2>性别：</h2></el-col>
            <el-col :span="4" :offset="2"><h2 v-if="this.message.sex==1">男</h2><h2 v-else>女</h2></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="5"><h2>身份证：</h2></el-col>
            <el-col :span="4" :offset="1"><h2>{{this.message.id_Num}}</h2></el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="5"><h2>phone：</h2></el-col>
            <el-col :span="4" :offset="2"><h2>{{this.message.phone_Num}}</h2></el-col>
          </el-row>
        </div>
        </el-col>
      </el-row>
    </el-card>
          <div class="aa">{{this.message.Project}} 管理员</div>
  </div>

</template>
<script>
export default{
  data(){
    return{
      message:[],
    }
  },
  mounted(){
    this.FindManager()
  },
  methods:{
    FindManager(){
      console.log("参数"+this.$route.params.id);
        this.$axios.get('/api/findmanager',{
          params:{
            id:this.$route.params.id
          }}).then(res=>{
            this.message=res.data
              console.log(res);
          })

    }
  }
}
</script>

<style>
.body{
    margin-top: 80px;
    background-image: linear-gradient(180deg, #A8E6CF 0%, #93D5DC 0%, #FFD3B6 100%);


}
.M_head{
    background-color: #bda8a870;
    box-shadow:0 0 1em #382407;
    -moz-border-radius:10em;
    -webkit-border-radius:10em; border-radius:10em;
}
.M_head:hover{
  box-shadow: 0 0 2em #6b4646;
}
.dataView{
  text-align:left;
}
.aa{
   position:absolute;
   bottom:-11%;
   left:35%;
   width: 30%;
   height: 15%;
   background-color: #ff454594;
   box-shadow:0 0 2em #e06565;
   border-radius:12px;
   line-height: 60px;
   font-size: 25px;
   border-collapse:

}
</style>
