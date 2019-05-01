<template>
<div>
   <van-nav-bar
    title="实名认证"
    left-text="返回"
    left-arrow
     />
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
      <van-panel v-if="showIdNumber" title="实名认证信息" status="待提交">
        <div>{{idNumber}}</div>
        <div slot="footer">
          <van-button size="small" type="danger" @click="commitCert()">提交</van-button>
        </div>
      </van-panel>  


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
        file,
      };
    },
    methods: {
      handleRemove(file, fileList) {
        this.showFlag=true;
        this.hideUpload = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlSuccess(response,file,fileList){
        console.log(response);
        if("bad"==response){
            this.$toast.fail('您上传的身份证照片无法识别');
            this.showIdNumber = false;
        }else{
            this.$toast.success("身份证识别成功");
            this.idNumber = response;
            this.showIdNumber = true;
        }
          this.hideUpload = true;
          console.log(file);
           this.dialogImageUrl = file.url;
          this.showFlag =false;
          this.file =file;
      },
      commitCert(){
        this.$axios.post("/api/commitCert")
      }
    }
  }
</script>
<style>
.hide .el-upload--picture-card {
    display: none;
}
</style>