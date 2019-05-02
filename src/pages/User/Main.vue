<template>
  <div>
    <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />
    <van-contact-card
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="show = true"
    />
    <van-popup
        v-model="show"
        position="bottom"
      >
      <van-button @click="show = false" >取消</van-button>
      <van-button type="danger" @click="loginOut()"> 退出登录</van-button>
      </van-popup>


    <van-cell-group>
      <van-cell icon="points" title="购买套餐" is-link @click="buyCombo()" />
      <van-cell icon="gold-coin-o" title="实名认证" is-link  @click="certification()"/>
      <van-cell icon="gift-o" title="评价停车场" is-link @click="evaluation()" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentContact:{
        name:'',
        tel:''
      },
      show:false,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.$axios.get("/api/user-get-phone-name").then(res=>{
        this.currentContact.name = res.data.c_name
        this.currentContact.tel = res.data.c_phone
      })
    },
    buyCombo(){
      this.$router.push("/user/buyCombo");
    },
    certification(){
      this.$router.push("/user/certification");
    },
    evaluation(){
      this.$router.push("/user/evaluation");
    }
  }
};
</script>

<style >
.poster {
    width: 100%;
    display: block;
  }
.group {
    margin-bottom: 15px;
  }
.links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
}
</style>