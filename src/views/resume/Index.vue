<template>
  <div class="person-center">
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="main">
      <person-center></person-center>
    </div>
  </div>
</template>

<script>
import StuNavBar from '../home/components/StuNavBar'
import PersonCenter from './components/PersonCenter'
export default {
  name: 'Index',
  components: {PersonCenter, StuNavBar},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .person-center {
    min-width: 1024px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
  .header {
    height: 50px;
  }
  .main {
    margin-top: 20px;
  }
</style>
