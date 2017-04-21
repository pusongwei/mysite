<template>
  <div id="app">
    <headerHome></headerHome>
    <router-view></router-view>
  </div>
</template>

<script>
import headerHome from '@/components/base/header.vue'
/*import mybg from '@/lib/mybg.js'*/
export default {
  name: 'app',
  components: {
    headerHome
  }
}
</script>

<style lang='less'>
  @import './lib/reset.css';
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
