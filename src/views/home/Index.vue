<template>
  <div class="main">
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="search-box">
      <search-box></search-box>
    </div>
    <div class="industry-select">
      <industry-select></industry-select>
    </div>
    <div style="margin-top: 20px">
      <job-cards></job-cards>
    </div>
  </div>
</template>

<script>

import {getList} from '../../api/job'
import JobCards from './components/JobCards'
import SearchBox from './components/SearchBox'
import StuNavBar from './components/StuNavBar'
import IndustrySelect from './components/IndustrySelect'

export default {
  name: 'Index',
  components: {IndustrySelect, StuNavBar, SearchBox, JobCards},
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
  .search-box {
    margin-top: 10px;
    height: 40px;
  }
  .header {
    height: 50px;
  }
  .industry-select {
    height: 242px;
    margin-top: 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
</style>
