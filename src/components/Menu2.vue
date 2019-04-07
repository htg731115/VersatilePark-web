<template>
  <div>
        <div  class="headWord animated fadeIn delay-2s">
          VersatilePark
        </div>
        <h5>默认颜色</h5>
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#409EFF"
          :default-active='active'
          background-color="rgb(69, 76, 83)"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>个人信息</span>
            </template>
              <el-menu-item index="/Manager/person" >修改个人详细信息</el-menu-item>
              <el-menu-item index="/Manager/changepassword">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>项目管理</span>
            </template>
              <el-menu-item index="/Manager/project">停车场管理</el-menu-item>
              <el-menu-item index="/Manager/evaluation">用户评价</el-menu-item>
              <el-menu-item index="/Manager/paycombo">套餐管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>停车管理</span>
            </template>
            <ElMenuItem index="/Manager/parkingrecord">停车记录</ElMenuItem>
            <ElMenuItem index="/Manager/portrecord">闸口监控</ElMenuItem>
            <ElMenuItem index="/Main/carflow">车量负载率统计</ElMenuItem>
          </el-submenu>
        </el-menu>
</div>
</template>
<script>
export default{
  data(){
    return{
      active:''
    }
  },
  mounted(){
    this.GetActive()
  },
  methods:{
    GetActive(){
      if(this.$route.path=='/manager/detail')
        this.active='/manager'
      else
        this.active=this.$route.path
      console.log("2"+this.active);
    }
  }
}
</script>
<style scoped>
.el-submenu{
  text-align: left;
}
.el-menu{
    border-right-width: 0;
}
.el-menu-item{
  border-right-width: 0;
  min-width: 100px;
}
.headWord{
    width: 280px;
    height: 60px;
    font-size: 40px;
    color: white;
    padding-top: 13px;
    box-shadow: inset 0px 0px 20px 3px hsla(0, 2%, 3%, 0.56);

}
</style>
