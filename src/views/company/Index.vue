<template>
  <div>
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="company-box">
      <div class="company-header">
        <div style="margin: 15px 0;font-size: 40px">
          {{ company.name }}
        </div>
        <div>
          {{ company.city }}
          <span style="margin: 0 10px">|</span>
          {{ company.scale }}
          <span style="margin: 0 10px">|</span>
          {{ industry.name }}
        </div>
      </div>
      <div class="company-nav">
        <el-tabs v-model="tabActive">
          <el-tab-pane label="企业介绍" name="first">
            <div class="company-content">
              {{ company.description }}
            </div>
          </el-tab-pane>
          <el-tab-pane label="在招岗位" name="second">
            <div class="job-list">
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
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {getOne} from '../../api/company'
import StuNavBar from '../home/components/StuNavBar'
import JobList from '../jobs/components/JobList'

export default {
  name: 'Index',
  components: {JobList, StuNavBar},
  data () {
    return {
      tabActive: 'first',
      company: {
        id: this.$route.params.companyId,
        lastUpdateTime: null,
        name: null,
        description: null,
        address: null,
        scale: null,
        industryId: null,
        image: null,
        city: null
      },
      jobs: [],
      industry: {
        id: null,
        name: null,
        parentId: null
      }
    }
  },
  created () {
    this.getOneById()
  },
  methods: {
    getOneById () {
      getOne(this.company.id).then(res => {
        this.company = res.data.company
        this.jobs = res.data.jobs
        this.industry = res.data.industry
      })
    }
  }
}
</script>

<style scoped>
  .company-box {
    width: 1024px;
    left: 50%;
    position: absolute;
    margin-left: -480px;
  }
  .company-header {
    height: 100px;
    text-align: left;
  }
  .company-content {
    text-align: left;
  }
  .header {
    height: 50px;
  }
</style>
