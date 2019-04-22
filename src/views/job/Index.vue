<template>
  <div>
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="job-box">
      <div class="job-header">
        <el-row>
          <el-col :span="18">
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
              <span class="split" v-if="job.educationRank === 'UNDERGRADUATE'">本科</span>
              <span class="split" v-else-if="job.educationRank === 'HIGH_SCHOOL'">高中</span>
              <span class="split" v-else-if="job.educationRank === 'TECHNICAL_SECONDARY_SCHOOL'">中专</span>
              <span class="split" v-else-if="job.educationRank === 'JUNIOR_COLLEGE'">大专</span>
              <span class="split" v-else-if="job.educationRank === 'MASTER'">硕士</span>
              <span class="split" v-else-if="job.educationRank === 'DOCTOR'">博士</span>
              <span class="split">{{ job.workDay }}/周</span>
              <span>实习{{ job.workTime }}个月</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="font-size: 25px;margin-top: 5px;color: #409EFF">
              <router-link class="com-info" :to="{ name: 'company', params: { companyId: company.id}}">{{ company.name }}</router-link>
            </div>
            <div>
              {{ company.scale }}
            </div>
            <div>
              {{ industry.name }}
            </div>
          </el-col>
        </el-row>
      </div>
      <hr/>
      <div class="job-detail">
        <div class="job-description">
          <div class="title">
            岗位描述：
          </div>
          <div style="text-align: left;margin-top: 10px;min-height: 500px">
            <pre>{{ job.description }}</pre>
          </div>
          <div class="job-address">
            工作地点：
          </div>
          <div style="text-align: left;margin-top: 10px">
            {{ job.address }}
          </div>
        </div>
      </div>
      <el-button @click="resumeSelectDialogOpen">投个简历</el-button>
      <el-dialog
        :visible="resumeSelectDialogVisible"
        title="选择简历"
        :before-close="handleClose">
        <el-button
          v-for="item in resumes"
          :key="item.id"
          style="width: 80%"
          @click="addApply(item.id)"
        >
          {{ item.resumeName }}
        </el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getOneById} from '../../api/job'
import StuNavBar from '../home/components/StuNavBar'
import {getPersonInfo, getResumeListByPersonInfoId} from '../../api/resume'
import {addApply} from '../../api/apply'

export default {
  name: 'Index',
  components: {StuNavBar},
  data () {
    return {
      resumeSelectDialogVisible: false,
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
      },
      resumes: []
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
    },
    resumeSelectDialogOpen () {
      this.resumeSelectDialogVisible = true
      getPersonInfo(this.$store.getters.userId).then(res => {
        getResumeListByPersonInfoId(res.data.id).then(res => {
          this.resumes = res.data
        })
      })
    },
    handleClose () {
      this.resumeSelectDialogVisible = false
    },
    addApply (val) {
      addApply(val, this.job.id).then(() => {
        this.resumeSelectDialogVisible = false
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
  .header {
    height: 50px;
  }
  .job-header {
    text-align: left;
  }
  .job-name {
    font-size: 40px;
  }
  .job-box {
    margin-top: 20px;
    position: absolute;
    width: 1024px;
    left: 50%;
    margin-left: -480px;
  }
  .job-date {
    margin-top: 15px;
  }
  .job-msg {
    margin-top: 15px;
  }
  .title {
    margin-top: 10px;
    text-align: left;
    font-size: 20px;
    font-weight: bolder;
  }
  .job-address {
    margin-top: 10px;
    text-align: left;
    font-size: 20px;
    font-weight: bolder;
  }
</style>
