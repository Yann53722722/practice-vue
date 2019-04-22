<template>
  <div class="job-list">
    <el-table
      width="100%"
      :data="jobList"
      :row-style="rowStyle"
      :show-header="false">
      <el-table-column>
        <template slot-scope="scope">
          <div class="job-info">
            <div>
              <router-link :to="{ name: 'job', params: { companyId: scope.row.company.id, jobId: scope.row.id}}" class="title">{{ scope.row.title }}</router-link>
              <span style="color: cornflowerblue">{{ scope.row.minSalary}}-{{ scope.row.maxSalary }}/天</span>
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
          <div class="company-info">
            <div>
              <router-link class="com-info" :to="{ name: 'company', params: { companyId: scope.row.company.id}}">{{ scope.row.company.name }}</router-link>
            </div>
            <div>
              <span>{{ scope.row.company.industry.industry.name }}/{{scope.row.company.industry.name}}/{{ scope.row.company.scale }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="10"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminGetList} from '../../../api/job'

export default {
  name: 'JobManageList',
  data () {
    return {
      rowStyle: {
        height: '100px'
      },
      jobList: null,
      query: {
        page: 1,
        size: 10
      },
      total: null
    }
  },
  created () {
    this.getJobList()
  },
  methods: {
    getJobList () {
      adminGetList(this.query).then(res => {
        this.jobList = res.data.content
        this.total = res.data.totalElements
      })
    },
    currentChange (val) {
      this.query.page = val
      this.getJobList()
    }
  }
}
</script>

<style scoped>

</style>
