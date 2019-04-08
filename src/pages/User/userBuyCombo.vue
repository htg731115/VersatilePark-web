<template>
<div>
   <van-nav-bar
    title="购买套餐"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <van-picker :columns="columns" @change="onChange" />
    <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
        />
</div>
</template>

<script>
export default {
    data(){
        return{
            columns:[],
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
        }
    }

}
</script>

<style>

</style>
