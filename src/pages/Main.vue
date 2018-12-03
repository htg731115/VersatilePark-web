<template>

<div id="Main">
<el-row>
  <el-col :span="3">
    <Menu></Menu>
  </el-col>
<el-col :span="18" :offset="1">
    <router-view></router-view>
</el-col>

</el-row>
</div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
  name:'Main',
  components:{Menu},
  data(){
    return{
    }
  }
}



</script>

<style >
.menu{
  width:200px;
}
</style>
