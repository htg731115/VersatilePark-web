<template>
    <div>
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
    }
}
</script>

<style>

</style>
