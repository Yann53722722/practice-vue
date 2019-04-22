<template>
  <div class="add-job">
    <div class="header">
      <com-nav-bar></com-nav-bar>
    </div>
    <div v-if="company.checked === 'CHECKED'" class="job-list">
      <div>
        <el-button style="width: 968px;margin: 10px 0" type="primary" @click="addJobDialogOpen">发布岗位</el-button>
      </div>
      <div>
        <el-table
          :show-header="false"
          :data="jobs">
          <el-table-column>
            <template slot-scope="scope">
              <div class="job-info">
                <div>
                  <router-link :to="{ name: 'job', params: { companyId: company.id, jobId: scope.row.id}}" class="title">{{ scope.row.title }}</router-link>
                </div>
                <div>
                  <span>{{ scope.row.city }}</span>
                  <span>{{ scope.row.workDay }}天/周</span>
                  <span>{{ scope.row.workTime }}月</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div>
                <div>
                  {{ scope.row.minSalary }}-{{ scope.row.maxSalary }}/天
                </div>
                <div>
                  {{ scope.row.lastUpdateTime }}刷新
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="200px">
            <template slot-scope="scope">
              <div style="float: right">
                <el-button type="primary" size="mini" @click="editJobDialogOpen(scope.$index)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteJob(scope.row.id,scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else style="margin-top: 20px">
      <span style="font-size: 30px">您的公司信息正在审核，请等待审核通过后进行岗位发布！</span>
    </div>
    <el-dialog
      :visible="addJobDialogVisible"
      :before-close="handleClose"
      title="岗位信息"
      >
      <el-form
        :model="job"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="岗位名称">
          <el-input style="width: 408.17px" v-model="job.title"/>
        </el-form-item>
        <el-form-item label="薪资范围">
          <el-input v-model="job.minSalary"/>~<el-input v-model="job.maxSalary"/>/天
        </el-form-item>
        <el-form-item label="每周工作天数">
          <el-input v-model="job.workDay"/>天
        </el-form-item>
        <el-form-item label="实习时长">
          <el-input v-model="job.workTime"/>个月
        </el-form-item>
        <el-form-item label="学历要求">
          <el-select v-model="job.educationRank">
            <el-option
              v-for="item in educationRanks"
              :key="item.value"
              :value="item.value"
              :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位类型">
          <el-select filterable v-model="job.jobTypeId">
            <el-option
              v-for="item in jobTypes"
              :key="item.id"
              :value="item.id"
              :label="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-select v-model="province" @change="citySelect" placeholder="请选择">
            <el-option
              v-for="item in provinceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="job.city" placeholder="请选择">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="job.address"/>
        </el-form-item>
        <el-form-item label="岗位描述">
          <el-input type="textarea" :rows="10" v-model="job.description"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrEdit === 'add'?addJob():editJob()">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ComNavBar from './components/ComNavBar'
import {getByUserId} from '../../api/company'
import {getAllType} from '../../api/jobType'
import {addJob, deleteJob, editJob} from '../../api/job'
import cities from '../../utils/cities'
export default {
  name: 'AddJob',
  components: {ComNavBar},
  data () {
    return {
      province: null,
      provinceOptions: null,
      cityOptions: null,
      jobTypes: [],
      educationRanks: [
        {
          value: 'HIGH_SCHOOL',
          label: '高中'
        },
        {
          value: 'TECHNICAL_SECONDARY_SCHOOL',
          label: '中专'
        },
        {
          value: 'JUNIOR_COLLEGE',
          label: '大专'
        },
        {
          value: 'UNDERGRADUATE',
          label: '本科'
        },
        {
          value: 'MASTER',
          label: '硕士'
        },
        {
          value: 'DOCTOR',
          label: '博士'
        }
      ],
      addOrEdit: 'add',
      userId: this.$route.params.userId,
      addJobDialogVisible: false,
      company: {
        id: null,
        lastUpdateTime: null,
        name: null,
        description: null,
        address: null,
        scale: null,
        industryId: null,
        image: null,
        city: null,
        checked: null
      },
      jobs: [],
      industry: {
        id: null,
        name: null,
        parentId: null
      },
      job: {
        id: null,
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
      index: null
    }
  },
  created () {
    this.provinceOptions = cities
    this.getOneByUserId()
    this.getJobTypes()
  },
  methods: {
    citySelect (value) {
      for (let i = 0; i < this.provinceOptions.length; i++) {
        if (this.provinceOptions[i].value === value) {
          this.cityOptions = this.provinceOptions[i].children
        }
      }
    },
    getOneByUserId () {
      getByUserId(this.userId).then(res => {
        this.company = res.data.company
        this.jobs = res.data.jobs
        this.jobs.reverse()
        this.industry = res.data.industry
      })
    },
    resetJob () {
      this.job = {
        id: null,
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
      }
    },
    addJobDialogOpen () {
      this.resetJob()
      this.addOrEdit = 'add'
      this.addJobDialogVisible = true
      this.job.companyId = this.company.id
    },
    handleClose () {
      this.addJobDialogVisible = false
    },
    getJobTypes () {
      getAllType().then(res => {
        this.jobTypes = res.data
      })
    },
    addJob () {
      addJob(this.job).then(res => {
        this.jobs.unshift(res.data)
        this.addJobDialogVisible = false
      })
    },
    deleteJob (id, index) {
      deleteJob(id).then(() => {
        this.jobs.splice(index, 1)
      })
    },
    editJobDialogOpen (index) {
      this.resetJob()
      this.index = index
      this.addOrEdit = 'edit'
      this.addJobDialogVisible = true
      let key
      let jobObj = this.jobs[index]
      for (key in jobObj) {
        this.job[key] = jobObj[key]
      }
    },
    editJob () {
      editJob(this.job).then(res => {
        this.$set(this.jobs, this.index, res.data)
        this.addJobDialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
  .header {
    height: 50px;
  }
  .job-list {
    margin-top: 20px;
    width: 968px;
    position: absolute;
    left: 50%;
    margin-left: -480px;
  }
  .el-input {
    width: 200px;
  }
</style>
