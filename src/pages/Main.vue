<template>

<div id="app">
<h1>hello{{a}}</h1>
</div>

</template>

<script>

export default {
  el:'#app',
  data(){
    return{
      a:this.store.state.Username
    }
  }
}



</script>

<style>

</style>
