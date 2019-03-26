<template>
  <div style="width: 1024px;align-self: center;">
    <div :key="item.id" v-for="item in jobList" style="width: 1024px;align-self: center">
      <el-card shadow="hover" style="width: 300px;float: left;margin-right: 20px">
        <div slot="header" class="job-info">
          <div class="job-title">
          </div>
          <span>{{ item.title }}</span>
        </div>
        {{ item.id }}
      </el-card>
    </div>
  </div>
</template>

<script>
import {getList} from '../../../api/job'
export default {
  name: 'JobCards',
  data () {
    return {
      jobList: null,
      jobQuery: {
        page: 1,
        size: 15
      },
      changeList: null
    }
  },
  created () {
    this.getJob()
  },
  methods: {
    getJob () {
      getList(this.jobQuery).then(res => {
        this.jobList = res.data.content
      })
    }
  }
}
</script>

<style scoped>

</style>
