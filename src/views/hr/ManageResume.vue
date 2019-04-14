<template>
  <div class="manage-resume">
    <div class="header">
      <com-nav-bar></com-nav-bar>
    </div>
    <div class="resume-list">
      <el-table
        :data="applies"
      >
        <el-table-column prop="resumeVO.resume.resumeName" label="简历名称"/>
        <el-table-column prop="resumeVO.personInfo.name" label="投递人姓名"/>
        <el-table-column prop="jobVO.job.title" label="投递岗位"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleOpenResume(scope.$index)" type="primary" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog
        title="简历详情"
        :visible="resumeShowVisible"
        width="60%"
        :before-close="handleResumeShowClose"
      >
        <div>
          <div style="text-align: left">
            <h1>基本信息</h1>
          </div>
          <el-card shadow="hover">
            <div slot="header" style="text-align: left">
              <span>{{ resumeVO.resume.resumeName }}</span>
            </div>
            <div>
              <div class="card-content">
                期望职位：<span class="content-font">{{ resumeVO.resume.expectJob }}</span>
              </div>
              <div class="card-content">
                期望城市：<span class="content-font">{{ resumeVO.resume.workingCity }}</span>
              </div>
              <div class="card-content">
                自我评价：<span class="content-font">{{ resumeVO.resume.selfEvaluation}}</span>
              </div>
              <div class="card-content">
                作品链接：<span class="content-font">{{ resumeVO.resume.worksLink }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left">
            <h1>个人信息</h1>
          </div>
          <el-card shadow="hover">
            <div slot="header" style="text-align: left">
              <span>{{ resumeVO.personInfo.name }}</span>
            </div>
            <div>
              <div class="card-content">
                性别：<span class="content-font" v-if="resumeVO.personInfo.gender === 'MALE'">男</span>
                <span class="content-font" v-else-if="resumeVO.personInfo.gender === 'FEMALE'">女</span>
              </div>
              <div class="card-content">
                电话：<span class="content-font">{{ resumeVO.personInfo.mobile }}</span>
              </div>
              <div class="card-content">
                邮箱：<span class="content-font">{{ resumeVO.personInfo.email}}</span>
              </div>
              <div class="card-content">
                出生年月：<span class="content-font">{{ resumeVO.personInfo.birthday }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left"><h1>教育背景</h1></div>
          <el-card style="margin-bottom: 10px" v-for="item in resumeVO.educations" :key="item.id">
            <div slot="header" style="text-align: left">
              {{ item.start }}~{{ item.end }}
              <span class="line">|</span>
              {{ item.school }}
              <span class="line">|</span>
              {{ item.profession }}
              <span class="line">|</span>
              <span v-if="item.educationRank === 'UNDERGRADUATE'">本科</span>
              <span v-else-if="item.education === 'HIGH_SCHOOL'">高中</span>
              <span v-else-if="item.education === 'TECHNICAL_SECONDARY_SCHOOL'">中专</span>
              <span v-else-if="item.education === 'JUNIOR_COLLEGE'">大专</span>
              <span v-else-if="item.education === 'MASTER'">硕士</span>
              <span v-else-if="item.education === 'DOCTOR'">博士</span>
            </div>
            <div class="card-content">
              成绩排名：<span class="content-font">{{ item.gradeRank }}</span>
            </div>
            <div class="card-content">
              主修课程：<span class="content-font">{{ item.courses }}</span>
            </div>
            <div class="card-content">
              荣誉奖励：<span class="content-font">{{ item.awards }}</span>
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left"><h1>实习经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="item in resumeVO.practiceExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left"><h1>学术经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="item in resumeVO.researchExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left"><h1>校园经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="item in resumeVO.schoolExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
        </div>
        <div>
          <div style="text-align: left"><h1>技能爱好</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="item in resumeVO.skills"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              <span v-if="item.skillType === 'PROFESSIONAL'">专业技能</span>
              <span v-if="item.skillType === 'LANGUAGE'">语言能力</span>
              <span v-if="item.skillType === 'HOBBY'">兴趣爱好</span>
              <span v-if="item.skillType === 'OTHER'">其他类型</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ComNavBar from './components/ComNavBar'
import {getByUserId} from '../../api/company'
import {getByCompany} from '../../api/apply'
export default {
  name: 'ManageResume',
  components: {ComNavBar},
  data () {
    return {
      resumeShowVisible: false,
      userId: this.$route.params.userId,
      company: null,
      jobs: [],
      jobIds: [],
      applies: [],
      resumes: [],
      resumeVO: {
        personInfo: {
          id: null,
          mobile: null,
          email: null,
          name: null,
          gender: null,
          birthday: null,
          city: null,
          age: null
        },
        resume: {
          id: null,
          personInfoId: null,
          expectJob: null,
          workingCity: null,
          selfEvaluation: null,
          worksLink: null,
          resumeType: null,
          resumeName: null
        },
        skills: [],
        educations: [],
        practiceExperiences: [],
        researchExperiences: [],
        schoolExperiences: []
      }
    }
  },
  created () {
    this.getResumes()
  },
  methods: {
    getResumes () {
      getByUserId(this.userId).then(res => {
        this.company = res.data.company
        this.jobs = res.data.jobs
        if (this.jobs.length !== 0) {
          for (let i = 0; i < this.jobs.length; i++) {
            this.jobIds.push(this.jobs[i].id)
          }
          getByCompany(this.jobIds).then(res => {
            this.applies = res.data
          })
        }
      })
    },
    handleOpenResume (index) {
      this.resetResumeVO()
      this.resumeVO.resume = this.applies[index].resumeVO.resume
      this.resumeVO.educations = this.applies[index].resumeVO.educations
      this.resumeVO.skills = this.applies[index].resumeVO.skills
      this.resumeVO.personInfo = this.applies[index].resumeVO.personInfo
      let experiences = this.applies[index].resumeVO.experiences
      for (let i = 0; i < experiences.length; i++) {
        if (experiences[i].experienceType === 'PRACTICEEXPERIENCE') {
          this.resumeVO.practiceExperiences.push(experiences[i])
        } else if (experiences[i].experienceType === 'RESEARCHEXPERIENCE') {
          this.resumeVO.researchExperiences.push(experiences[i])
        } else if (experiences[i].experienceType === 'SCHOOLEXPERIENCE') {
          this.resumeVO.schoolExperiences.push(experiences[i])
        }
      }
      this.resumeShowVisible = true
    },
    resetResumeVO () {
      this.resumeVO = {
        resume: {
          id: null,
          personInfoId: null,
          expectJob: null,
          workingCity: null,
          selfEvaluation: null,
          worksLink: null,
          resumeType: null,
          resumeName: null
        },
        skills: [],
        educations: [],
        practiceExperiences: [],
        researchExperiences: [],
        schoolExperiences: []
      }
    },
    handleResumeShowClose () {
      this.resumeShowVisible = false
    }
  }
}
</script>

<style scoped>
  .header {
    height: 50px;
  }
  .manage-resume {
    width: 1024px;
    position: absolute;
    left: 50%;
    margin-left: -480px;
  }
  .card-content {
    text-align: left;
    margin-top: 10px;
  }
  .content-font {
    color: gray;
  }
  .resume-list {
    margin-top: 20px;
    width: 1024px;
    position: absolute;
    left: 50%;
    margin-left: -480px;
  }
</style>
