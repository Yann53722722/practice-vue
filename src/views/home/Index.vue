<template>
  <div>
    <el-container style="align-items: center">
      <el-header style="width: 1024px">
        <el-menu mode="horizontal" background-color="#545c64">
          <el-menu-item style="">首页</el-menu-item>
          <el-menu-item>个人中心</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <job-cards></job-cards>
      </el-main>
    </el-container>
    <el-button @click="getJob">测试</el-button>
    <div>
      {{data}}
    </div>
    <el-row>
      <el-col>

      </el-col>
    </el-row>
  </div>
</template>

<script>

import {getList} from '../../api/job'
import JobCards from './components/JobCards'

export default {
  name: 'Index',
  components: {JobCards},
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

</style>
