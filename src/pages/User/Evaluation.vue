<template>
    <div>
    <van-nav-bar
        title="评价停车场"
        left-text="返回"
        left-arrow
     />
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
  <el-rate v-model="degress" :max ="3" :show-text="true"
  :texts="['差评','一般','好评']"
  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
  style="margin-top:30px">
  </el-rate>
    <van-cell-group>
<el-input
  type="textarea"
  :rows="3"
  placeholder="请输入内容"
  v-model="content"
  style="margin-top:20px;margin-bottom:20px">
</el-input>
</van-cell-group>
<van-button type="info" @click="commit()">提交</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text:"",
            tempSelect:"",
            select:"",
            columns:[],
            show:false,
            degress:null,
            content:"",
        }
    },
    mounted(){
        this.init();
    },
    methods:{
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
      commit(){
          let tempDegress = this.degress;
          if(this.degress == null){
              this.$toast.fail("请选择评价级别")
          }
          if(this.degress ==3){
              tempDegress = 1;
          }else if(this.degress == 1){
              tempDegress = 3  ;
          }
          let postData = this.$qs.stringify({
              projectId:this.select,degress:tempDegress,content:this.content
          })
          this.$axios.post("/api/commit-evaluation",postData).then(res=>{
            this.$toast.success("评价成功");
            this.$router.push("/user/Main");
          })
      }
    }
}
</script>

<style>

</style>
