<template>

<div id="Main" >
  <el-row >
    <Header/>
    <el-row>
      <el-col :span="4" class="menu" >
        <Menu/>
      </el-col>
      <el-col :span="19" class="view">
        <el-row>
            <router-view></router-view>
        </el-row>
    </el-col>
  </el-row>
  </el-row>
</div>
</template>

<script>
import Menu from '../components/Menu.vue'
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

<style >
body{
  margin: 0px;
}
.menu{
height: 900px;
background-color: #545c64;
margin-right: 10px;
}
.view{
padding-left: 30px;
}
</style>
