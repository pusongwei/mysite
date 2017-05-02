<template>
  <div id="app">
    <loadingMove></loadingMove>
    <headerHome></headerHome>
    <router-view></router-view>
  </div>
</template>

<script>
import headerHome from '@/components/base/header.vue'
import loadingMove from '@/components/base/loading.vue'
/*import mybg from '@/lib/mybg.js'*/
export default {
  name: 'app',
  components: {
    headerHome,
    loadingMove
  }
}
</script>

<style lang='less'>
  @import './lib/reset.css';
  html,body{
    user-select:text;
  }
  body{
    background:url(assets/bg.jpg);
  }
  #app{
    padding-top: 100px;
    width: 1080px;
    margin:auto;
  }
  @media all and (max-width: 439px){
    #app{
      padding-top: 40px;
      width: 100%;
    }
  }
</style>
