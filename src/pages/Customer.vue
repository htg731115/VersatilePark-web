<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="5">
        <div class="card_panel c_wapper1">
          <el-row>
              <el-col :span="16" ><el-row>用户总数</el-row><el-row class="word">{{this.totalCustomer}}人</el-row></el-col>
              <el-col :span="8" ><img src="../assets/user.svg" style="height: 108px"/></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="card_panel c_wapper2">
          <el-col :span="16" ><el-row>实名认证人数：</el-row><el-row class="word">{{this.certNum}}人</el-row></el-col>
          <el-col :span="8" ><img src="../assets/IdeUser.svg" style="height: 98px"/></el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><el-button type="primary" @click="handleButton()"><span v-if="showCert"> 筛选出所有用户</span><span v-else >筛选出实名认证用户</span> </el-button></el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card>
          <el-col :span="4" :offset="8">
          <el-input v-model="customerName" placeholder="请输入客户名称"/>
          </el-col>
          <el-col :span="4">
          <el-button @click="search()">查询</el-button></el-col>
          <el-table
             :data="customerData"
             height="500"
             border>
             <el-table-column prop="c_id" label="客户ID" width="148"/>
             <el-table-column prop="c_name" label="客户名称" width="180"/>
             <el-table-column prop="sex" label="性别" width="148">
               <template slot-scope="scope">
                  <el-tag v-if="scope.row.sex==1">男</el-tag>
                  <el-tag v-else type="danger" >女</el-tag>
               </template>
             </el-table-column>
             <el-table-column prop="c_phone" label="联系号码" width="148"/>
             <el-table-column
               prop="project"
               label="签约停车场">
             </el-table-column>
             <el-table-column
               label="操作"
               width="120">
               <template slot-scope="scope">
                <el-button v-if="check(scope.row.c_id)" type="primary" icon="el-icon-edit" v-on:click="AlterCustomer(scope.row)">编辑</el-button>
               </template>
             </el-table-column>
           </el-table>
         </el-card>
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="24"><el-pagination class="pagewapper"
           @current-change="handleChange()"
           :current-page.sync="pageNum"
           background
           layout="prev, pager, next, jumper"
           :total="totalPages">
         </el-pagination></el-col>
     </el-row>

<!-- dialog -->
  <el-dialog title="新增管理员" :visible.sync="ShowDialog" width="30%" >
    <el-row>
      <el-col style="margin-bottom:20px"><el-col :span="4">姓名</el-col><el-col :span="18"><el-input v-model="alterCustomerData.c_name" placeholder=""  :disabled="true"/></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">手机号码</el-col><el-col :span="18"><el-input v-model="alterCustomerData.c_phone"  placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">签约车牌号</el-col><el-col :span="18"><el-input v-model="alterCustomerData.plate_num" placeholder="" /></el-col></el-col>
      <el-col style="margin-bottom:20px"><el-col :span="4">身份证号码</el-col><el-col :span="18"><el-input v-model="alterCustomerData.idnumber" placeholder="" /></el-col></el-col>
      <el-col >
       <el-radio v-model="alterCustomerData.sex" :label="1">男</el-radio>
       <el-radio v-model="alterCustomerData.sex" :label="2">女</el-radio>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submit()">提交</el-button>
    <el-button @click="ShowDialog=false">关闭</el-button>
  </el-dialog>
<!-- dialog -->

  </div>
</template>
<script>
export default{
  data(){
    return{
      customerData:[],
      totalCustomer:0,
      pageNum:1,
      totalPages:0,
      certNum:0,
      showCert:false,
      customerName:"",
      ShowDialog:false,
      alterCustomerData:[{
        c_id:'',
        c_name:'',
        c_phone:'',
        plate_num:1,
        sex:null,
        idnumber:'',

      }],
    }
  },
  mounted(){
    this.GetCustomer(),
    this.GetTotal();
    this.GetCertNum();//实名认证数
  },
  methods:{
    handleChange(){
      if(this.showCert==true)
        this.GetCertCustomer();
      else
        this.GetCustomer();
    },
    handleButton(){
      this.pageNum=1;
      this.showCert=!this.showCert;
      this.handleChange();
    },
    GetCustomer(){
      this.$axios.get('/api/getcustomer',{
        params:{
          pageNum:this.pageNum        
          } 
      }).then(res=>{
        this.customerData=res.data.list;
        this.totalPages=res.data.pages*10;
      })
    },
    GetTotal(){
      this.$axios.get("/api/gettotal").then(res=>{
        this.totalCustomer=res.data;
        console.log(this.totalCustomer);
      })
    },
    GetCertNum(){
      this.$axios.get("/api/getcertnum").then(res=>{
        this.certNum=res.data;
      })
    },
    GetCertCustomer(){
      this.$axios.get("/api/getcertcustomer",{
        params:{
          pageNum:this.pageNum
        } 
      }).then(res=>{
        this.customerData=res.data.list;
        this.totalPages=res.data.pages*10;
      })
    },
    check(id)
    {
      let a=["1"]
      console.log(a.includes("1"))
      return a.includes("1");
    },
    AlterCustomer(customer){
      this.ShowDialog = true;
      let customerData = customer;
      this.alterCustomerData = customerData;
      console.log(customerData)
    },
    submit(){
      let postData = {
        customerId:this.alterCustomerData.c_id,
        phone:this.alterCustomerData.c_phone,
        plateNum:this.alterCustomerData.plate_num,
        sex:this.alterCustomerData.sex,
      }
      this.$axios.post("/api/alter-customer",postData).then(res=>{
        this.$message.success("修改成功")
      })
    },
    search(){
      this.showCert = false;
        this.$axios.get('/api/search-customer-name',{
        params:{
          pageNum:this.pageNum,
          name:this.customerName        
          } 
      }).then(res=>{
        this.customerData=res.data.list;
        this.totalPages=res.data.pages*10;
      })
    }
  }
}
</script>
<style>
.bg{
  background-image: linear-gradient(0deg, #9b6e78 0%, #F993E2 0%, #79A8FF 100%)

}
.card_panel{
  height:108px;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 0 0 30px #cac6c6;
  text-align: left;
  font-family: "PingFang SC";
  font-size: 1.5vw;
  color: #fff;
}
.c_wapper1{
    background: #82e7a5;
}
.c_wapper2{
  background-image: linear-gradient(135deg, #FF0000 0%, #FCA180 100%)
}
.word{
  padding-left: 2vw;
  padding-top: 1vw;
}
.table{
  margin-top: 20px;
}
.pagewapper{
  padding-top: 25px;
  
}
</style>
