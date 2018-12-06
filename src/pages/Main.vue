<template>

<div id="Main">
  <el-container style="height: 100%">
    <el-aside width="250px">
      <Menu></Menu>
    </el-aside>
    <el-container>
    <el-header>
      <Header></Header>
    </el-header>
      <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
    </el-container>
</div>

</template>

<script>
import Menu from '../components/Menu.vue';
import Header from '../components/Header.vue'
export default {
  name:'Main',
  components:{Menu,Header},
  data(){
    return{
    }
  }
}
</script>

<style>
.el-aside{
  height:1000PX;
  background-color: #545c64;
}
</style>
