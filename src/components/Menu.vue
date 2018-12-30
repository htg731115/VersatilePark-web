<template>
  <div>
        <h5>默认颜色</h5>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :default-active='active'
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>停车场项目</span>
            </template>
              <el-menu-item index="/project" >项目列表</el-menu-item>
              <el-menu-item index="/manager">管理员</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>运营管理</span>
            </template>
              <el-menu-item index="/customer">用户管理</el-menu-item>
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
}
</style>
