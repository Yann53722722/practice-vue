<template>
  <div class="main">
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div>
      <search-box></search-box>
    </div>
    <div style="margin-top: 50px">
      <job-cards></job-cards>
    </div>
  </div>
</template>

<script>

import {getList} from '../../api/job'
import JobCards from './components/JobCards'
import SearchBox from './components/SearchBox'
import StuNavBar from './components/StuNavBar'

export default {
  name: 'Index',
  components: {StuNavBar, SearchBox, JobCards},
  data () {
    return {
      data: null,
      query: {
        page: 1,
        size: 2
      }
    }
  },
  created () {
  },
  methods: {
    test () {
      alert('hello')
    },
    getJob () {
      getList(this.query).then(res => {
        this.data = res
      })
      console.log(this.data)
    }
  }
}
</script>

<style>
  .main {
    min-width: 1024px;
    text-align: center;
    width: 100%;
    position: absolute;
  }
  .el-main {
    width: 1024px;
    align-self: center;
    padding: 31px;
  }
</style>
