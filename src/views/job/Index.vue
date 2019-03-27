<template>
  <div>
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="job-box">
      <div class="job-header">
        <div class="job-name">
          {{ job.title }}
        </div>
        <div class="job-date">
          <span class="date-font">{{ job.lastUpdateTime }}</span>
          <span>刷新</span>
        </div>
        <div class="job-msg">
          <span class="split">{{ job.minSalary }}-{{ job.maxSalary }}/天</span>
          <span class="split">{{ job.city }}</span>
          <span class="split">{{ job.educationRank }}</span>
          <span class="split">{{ job.workDay }}/周</span>
          <span>实习{{ job.workTime }}个月</span>
        </div>
      </div>
      <div class="job-detail">
        <div class="job-description">
          <div class="title">
            岗位描述：
          </div>
          <div>
            {{ job.description }}
          </div>
          <div class="job-address">
            工作地点：
          </div>
          <div>
            {{ job.address }}
          </div>
        </div>
      </div>
      <el-button>投个简历</el-button>
    </div>
  </div>
</template>

<script>
import {getOneById} from '../../api/job'
import StuNavBar from '../home/components/StuNavBar'

export default {
  name: 'Index',
  components: {StuNavBar},
  data () {
    return {
      job: {
        id: this.$route.params.jobId,
        lastUpdateTime: null,
        title: null,
        minSalary: null,
        maxSalary: null,
        workDay: null,
        workTime: null,
        educationRank: null,
        description: null,
        address: null,
        city: null,
        jobTypeId: null,
        companyId: null
      },
      company: {
        id: null,
        address: null,
        description: null,
        image: null,
        industryId: null,
        lastUpdateTime: null,
        name: null,
        scale: null
      },
      industry: {
        id: null,
        name: null,
        parentId: null
      },
      jobType: {
        id: null,
        name: null,
        industryId: null
      }
    }
  },
  created () {
    this.getJob()
  },
  methods: {
    getJob () {
      getOneById(this.job.id).then(res => {
        this.job = res.data.job
        this.company = res.data.company
        this.jobType = res.data.jobType
        this.industry = res.data.industry
      })
    }
  }
}
</script>

<style scoped>
.job-msg .split::after {
  content: "|";
  margin: 10px;
}
</style>
