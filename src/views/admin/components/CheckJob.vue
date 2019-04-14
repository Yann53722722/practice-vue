<template>
  <div class="check-job">
    <el-table
      :data="jobList"
    >
      <el-table-column
        label="岗位名称"
        width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.company.name }}</p>
            <p>行业: {{ scope.row.industry.name }}</p>
            <p>介绍: {{ scope.row.company.description }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.job.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位类型" prop="jobType.name"/>
      <el-table-column align="center" label="薪资范围">
        <template slot-scope="scope">
          {{ scope.row.job.minSalary }}~{{ scope.row.job.maxSalary }}/天
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作天数">
        <template slot-scope="scope">
          {{ scope.row.job.workDay }}/周
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作时长">
        <template slot-scope="scope">
          {{ scope.row.job.workTime }}月
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="checkJob(scope.row.job.id,scope.$index)">审核通过</el-button>
          <el-button
            size="mini"
            type="danger">审核不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {checkJob, getUncheckList} from '../../../api/job'

export default {
  name: 'CheckJob',
  data () {
    return {
      jobList: []
    }
  },
  created () {
    this.getUncheckList()
  },
  methods: {
    getUncheckList () {
      getUncheckList().then(res => {
        this.jobList = res.data
      })
    },
    checkJob (val, index) {
      checkJob(val).then(() => {
        this.jobList.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>

</style>
