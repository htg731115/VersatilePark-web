<template>
<div>
   <van-nav-bar
    title="实名认证"
    left-text="返回"
    left-arrow
     />
     
     <!-- 从未提交过实名认证 -->
     <div v-if="status!=0&&status!=1">       
      <van-row style="margin-top:20px">
      <van-col span="8"> <van-button @click="showDialog()" > 选择停车场</van-button></van-col>
      <van-col span="16"><van-field   :value="text" error disabled/> </van-col>
      </van-row>
     <van-dialog
        v-model="show"
        title="请选择停车场"
        show-cancel-button
        @cancel="onCancel"
        @confirm="onConfirm"
        >
        <van-picker ref="vanPicker" :columns="columns"  @change="onChange" :default-index="0"/>
        </van-dialog>
     <el-upload
        action="http://localhost:8080/api/ocr-idnumber"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handlSuccess"
        :class="{hide:hideUpload}"
        :limit="1"
        style="margin-top:40px">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      <van-panel v-if="showIdNumber" style="margin-top:30px" title="实名认证信息" :status="statusText">
        <div>
          <van-row style="margin-top:10px">
            身份证号码
          </van-row>
          <van-row >
          {{idNumber}}
          </van-row>
          </div>
          <van-cell-group>
          <van-field
            v-model="plateNumber"
            center
            clearable
            label="车牌号码"
            placeholder="请输入车牌号码"
          >
            <van-button slot="button" size="small" @click="commitCert()" type="primary">提交</van-button>
          </van-field>
          </van-cell-group>
      </van-panel>  
      </div>
      <!-- 从未提交过实名认证 -->
      <div v-else>
         <van-row style="margin-top:20px">
            <van-col span="16" offset="8"><van-field :value="text" error disabled/> </van-col>
                  <van-panel  style="margin-top:30px" title="实名认证信息" status="已认证">
              <div>
                <van-row style="margin-top:10px">
                  身份证号码
                </van-row>
                <van-row >
                {{idNumber}}
                </van-row>
                </div>
                <van-cell-group>
                <van-col offset="4">
                <van-field
                  v-model="plateNumber"
                  center
                  clearable
                  disabled
                  label="车牌号码"
                  placeholder="请输入车牌号码"
                >
                </van-field>
                </van-col>
                </van-cell-group>
            </van-panel>  
        </van-row>
      </div>

</div>
</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        showFlag:true,
        hideUpload:false,
        idNumber:"",
        showIdNumber:false,
        file:null,
        statusText:"",
        imgSrc:"",
        columns:[],
        projectId:"-1",
        show:false,
        text:"",
        tempSelect:"",
        select:"",
        plateNumber:"",
        status:"",
      };
    },
    mounted(){
      this.init();
      this.getCert();
    },
    methods: {
      init(){
        var  va ;
        this.$axios.get("/api/getallproject").then(res=>{
            res.data.forEach(element => {
                  va = {"keyId":element.id,"text":element.name}
                  this.columns.push(va);
            });
            this.select = this.columns[0].keyId;
            this.text = this.columns[0].text;
        })
      },
      getCert(){
        this.$axios.get("/api/adjust-cert").then(res=>{
           this.status = res.data.status;

          if(this.status == 0){
            this.statusText ="待审核"
            this.idNumber = res.data.idnumber;
            this.text = res.data.name;  
            this.plateNumber = res.data.plate_num;          
          }else if(this.status == 1){
            this.idNumber = res.data.idnumber;
            this.text = res.data.name;       
            this.plateNumber = res.data.plate_num;   
            this.statusText = "审核通过"
          }
          
        })
      },
      handleRemove(file, fileList) {
        this.showFlag=true;
        this.hideUpload = false;
        this.showIdNumber = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlSuccess(response,file,fileList){
        console.log(response);
        if("bad"==response.idNumber){
            this.$toast.fail('您上传的身份证照片无法识别');
            this.showIdNumber = false;
        }else{
            this.$toast.success("身份证识别成功");
            this.idNumber = response.idNumber;
            this.showIdNumber = true;
            this.statusText = "待提交"
        }
        this.imgSrc = response.imgSrc;
        this.hideUpload = true;
        console.log(file);
          this.dialogImageUrl = file.url;
        this.showFlag =false;
        this.file =file;
      },
      commitCert(){
        if(this.plateNumber==""){
          this.$toast.fail("请先输入车牌号码")
        }else{
          let postData = this.$qs.stringify({
            idNumber:this.idNumber,imgSrc:this.imgSrc,projectId:this.select,plateNumber:this.plateNumber
          })
          this.$axios.post("/api/commitCert",postData).then(res=>{
            this.$toast.success("认证提交成功");
            this.$router.push("/user/Main");
          })
        }
      },
      onConfirm(){
           this.select = this.tempSelect;
           this.columns.forEach(element => {
               if(element.keyId == this.select)
                this.text = element.text
           });
           
      }, 
      showDialog(){
          this.show = !this.show;
          this.tempSelect = this.select;
      },
      onCancel(){
          this.tempSelect = this.select;
          this.show = !this.show;
      },
      onChange(picker, value, index) {
            this.tempSelect = value.keyId;
        },
    },
  }
</script>
<style>
.hide .el-upload--picture-card {
    display: none;
}
</style>