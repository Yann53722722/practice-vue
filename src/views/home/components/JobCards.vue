<template>
  <div class="job-cards">
      <el-card shadow="hover" :key="item.id" v-for="item in jobList">
        <div slot="header" class="job-info">
          <div class="job-title">
            <router-link :to="{ name: 'job', params: { companyId: item.company.id, jobId: item.id}}" class="title">{{ item.title }}</router-link>
            <span class="salary">{{ item.minSalary }}-{{ item.maxSalary }}/天</span>
          </div>
          <div class="job-detail">
            <span>{{ item.city }}</span>
            <span>{{ item.workDay }}天/周</span>
            <span>{{ item.workTime }}月</span>
          </div>
        </div>
        <div class="company-info">
          <router-link :to="{ name: 'company', params: { companyId: item.company.id}}">{{ item.company.name }}</router-link>
          <div class="company-detail">
            <span>{{ item.company.industry.name }}</span>
            <span>|{{ item.company.scale }}</span>
          </div>
        </div>
      </el-card>
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
  .job-cards {
    width: 1024px;
    left: 50%;
    margin-left: -512px;
    position: absolute;
  }
  .el-card {
    width: 300px;
    float: left;
    margin-top: 31px;
    margin-left: 31px
  }
</style>
