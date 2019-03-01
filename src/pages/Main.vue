<template>
<div>
    
    <div  class="app-wrapper">
      <Menu class="sidebar-container"/>
    </div>
    <div>
      <navbar class="head"/>
      </div>
    <div class="main-container">
      <router-view></router-view>
    </div>

</div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name:'Main',
  components:{Menu,Navbar},
  data(){
    return{
    }
  }
}



</script>
<style lang="scss">
@import '../assets/layout.scss';
</style>
