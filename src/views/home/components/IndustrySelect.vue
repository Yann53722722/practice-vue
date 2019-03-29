<template>
  <div class="industry-select">
    <el-card shadow="always">
      <el-row>
        <el-col :span="3">
          <div>
            <el-table
              :data="industryList"
              :show-header="false"
              ref="parent"
              class="industry-table"
              highlight-current-row
              @current-change="handleIndustryChange"
              height="200">
              <el-table-column
                prop="industry.name"
                align="center"
              />
            </el-table>
          </div>
        </el-col>
        <el-col :span="3">
          <el-table
            :data="industryChildren"
            :show-header="false"
            class="industry-table"
            highlight-current-row
            ref="child"
            @current-change="handleChildChange"
            height="200">
            <el-table-column
              prop="name"
              align="center"
            />
          </el-table>
        </el-col>
        <el-col :span="18">
          <div>
            <div
              class="job-type"
              v-for="jobType in jobTypes"
              :key="jobType.id"
            >
              <div class="job-type-name">{{ jobType.name }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getAll} from '../../../api/industry'

export default {
  name: 'IndustrySelect',
  data () {
    return {
      industryList: [],
      currentRow: null,
      industryChildren: [],
      jobTypes: []
    }
  },
  created () {
    this.getIndustryList()
  },
  methods: {
    getIndustryList () {
      getAll().then(res => {
        this.industryList = res.data
        if (this.industryList.length !== 0) {
          this.setParentCurrent(this.industryList[0])
          this.setChildCurrent(this.industryChildren[0])
        }
      })
    },
    handleIndustryChange (val) {
      this.industryChildren = val.industries
      this.setChildCurrent(this.industryChildren[0])
    },
    setParentCurrent (row) {
      this.$refs.parent.setCurrentRow(row)
    },
    setChildCurrent (row) {
      this.$refs.child.setCurrentRow(row)
    },
    handleChildChange (val) {
      this.jobTypes = val.jobTypes
    }
  }
}
</script>

<style scoped>
.industry-select {
  border: gray 1px;
  width: 968px;
  padding-top: 150px;
  left: 50%;
  margin-left: -481px;
  position: absolute;
  z-index: 2;
}
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .industry-table {
  }
  .job-type {
    width: 20%;
    height: 48px;
    float: left;
    cursor: pointer;
  }
  .job-type:hover {
    background-color: #ecf5ff;
  }
  .job-type-name {
    height: 24px;
    margin-top: 12px;
  }
</style>
