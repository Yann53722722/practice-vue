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
      <el-table-column>
        <template slot-scope="scope">
          <div class="company-img">
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'JobList',
  props: {
    jobList: Array
  },
  data () {
    return {
      rowStyle: {
        height: '100px'
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .job-list {
    width: 968px;
    left: 50%;
    margin-left: -481px;
    position: absolute;
  }
  .title {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 20px;
  }
  .com-info {
    text-decoration: none;
    font-weight: bold;
    color: #409EFF;
    font-size: 20px;
  }
</style>
