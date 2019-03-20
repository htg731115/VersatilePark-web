<template>
    <div>
        <el-row style="margin-top: 80px;">
            <el-col :span="7" class="cardWapper" :offset="3" >
                <el-row class="itemMargin" style="margin-top: 40px;">
                    <el-col :span="10" :offset="1">姓名：</el-col>
                    <el-col :span="10"><span v-if="changeFlag==false">{{dataList.name}}</span><el-input v-model="dataList.name" v-else size="mini"/></el-col>
                </el-row>
                <el-row class="itemMargin">
                    <el-col :span="10" :offset="1">性别：</el-col>
                    <el-col :span="10"><span v-if="dataList.sex==1">男</span><span v-else>女</span></el-col>
                </el-row>
                <el-row class="itemMargin">
                    <el-col :span="10" :offset="1">身份证：</el-col>
                    <el-col :span="10"><span v-if="changeFlag==false">{{dataList.id_Num}}</span>
                    <el-input v-else v-model="dataList.id_Num"  size="mini"/>
                    </el-col>
                </el-row>
                <el-row class="itemMargin">
                    <el-col :span="10" :offset="1">phone：</el-col>
                    <el-col :span="10"><span v-if="changeFlag==false">{{dataList.phone_Num}}</span>
                    <el-input v-else v-model="dataList.phone_Num" size="mini"/>
                    </el-col>
                </el-row>
                <el-row style="margin: 40px;font-size: 29px;color: #ffdede;">
                    {{dataList.Project}} 管理员
                </el-row>
            </el-col>
            <el-col :span="5">
                <img src="../../assets/timg.jpg" class="img"/>
            </el-col>
        </el-row>
          <el-row>
                <el-button v-if="changeFlag" type="success" plain @click="editManagerInfo()">确认修改</el-button>
                <el-button v-if="changeFlag" type="danger" plain @click="returnTemp()">取消</el-button>
                <el-button v-else type="primary" plain @click="changeFlag=!changeFlag">修改通用套餐</el-button>
            </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dataList:[],
            changeFlag:false,
            idNum:'',
            temp:[{name:"",idNum:"",phoneNum:""}],
        }
    },
    mounted(){
        this.GetManager();
    },
    methods:{
      GetManager(){
        this.$axios.get('/api/findmanager',{
        params:{
            id:this.$store.state.userId
        }}).then(res=>{
            this.dataList=res.data
            this.temp.name = this.dataList.name;
            this.temp.idNum = this.dataList.id_Num;
            this.temp.phoneNum = this.dataList.phone_Num;
            console.log(res.data);
        })
    },
      returnTemp(){
          this.dataList.phone_Num = this.temp.phoneNum;
          this.dataList.name = this.temp.name;
          this.dataList.id_Num = this.temp.idNum;
          this.changeFlag =false;
      },
      editManagerInfo(){
          this.$axios.post('/api/edit-manager-info',{
              id:this.$store.state.userId,
              id_Num:this.dataList.id_Num,
              phone_Num:this.dataList.phone_Num,
              name:this.dataList.name,
          }).then(res=>{

          })
      }
    }
}
</script>

<style lang="scss">
$imgheight:400px;
.cardWapper{
    height: $imgheight;
    background: #606266;
    color:#f6f6f6;
    font-size: 18px;
    box-shadow: -20px 14px 10px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgb(255, 255, 255);
    transition: border-color 1s,background-color 1s,color .3s,height 1s;;
}
.cardWapper:hover{
    background: #a1030373;
    height: $imgheight+20px;
}
.img{
    border: 2px solid #d7dae2;
    height: $imgheight;
}
.itemMargin{
    margin-top: 20px;
    transition:width 3s;
}
</style>

