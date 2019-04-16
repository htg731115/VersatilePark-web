<template>
<div>
   <van-nav-bar
    title="购买套餐"
    left-text="返回"
    right-text="按钮"
    left-arrow

    />
    <van-row style="margin-top:20px">
    <van-col span="8"> <van-button @click="showDialog()" > 选择停车场</van-button></van-col>
    <van-col span="8"><van-field   :value="text" error disabled/> </van-col>
    </van-row>
        <van-dialog
        v-model="show"
        title="标题"
        show-cancel-button
        @cancel="onCancel"
        @confirm="onConfirm"
        >
        <van-picker ref="vanPicker" :columns="columns"  @change="onChange" :default-index="0"/>
        </van-dialog>  

    <van-cell-group style="margin-top:40px">
        <van-panel title="套餐说明" desc="通用套餐可适用于所有停车场,如该停车场有配置套餐则只能购买该停车场套餐" >
            <van-row>
                套餐名称：{{combo.combo_name}}
            </van-row>
            <van-row style="margin-top:10px">
               套餐可使用时间:<span style="color :red"> {{combo.effective_length}}个月</span>
            </van-row>
        </van-panel>
</van-cell-group>

    <van-cell-group style="margin-top:50px">
          <van-col offset="3"><van-field
            v-model="plateNumber"
            label="车牌号码"
            type="text"
            placeholder="请输入车牌号码"
            size="large"
        /></van-col>

    </van-cell-group>
    
    <van-submit-bar
    v-if="plateNumber==''"
        disabled
        :price="combo.money*100"
        button-text="提交订单"
         @submit="onSubmit"
    
        />
          <van-submit-bar
    v-else 
        :price="combo.money*100"
        button-text="提交订单"
    
        />
</div>
</template>

<script>
export default {
    data(){
        return{
            columns:[{keyId:-1,text:'通用套餐'}],
            show:false,
            select:-1,
            tempSelect:-1,
            text:'通用套餐',
            combo:[],
            plateNumber:''
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
            })
            this.getSellCombo();
        },
        getSellCombo(){
            this.$axios.get("/api/user-get-payCombo",{
                params:{
                    projectId:this.select,
                }
            }).then(res=>{
                this.combo = res.data;
            })
        },
        onChange(picker, value, index) {
            this.tempSelect = value.keyId;
        },
        showDialog(){
            this.show = !this.show;
            this.tempSelect = this.select;
        },
        onConfirm(){
           this.select = this.tempSelect;
           this.columns.forEach(element => {
               if(element.keyId == this.select)
                this.text = element.text
            
           });
           this.getSellCombo();
           console.log(this.columns[this.select]);
        },
        onCancel(){
            this.tempSelect = this.select;
            this.show = !this.show;
            
        },
        onSubmit(){
            
        }
    }

}
</script>

<style>

</style>
