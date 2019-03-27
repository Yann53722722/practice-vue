<template>
  <div>
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="company-box">
      <div class="company-header">
        {{ company.name }}
      </div>
      <div class="company-nav">
        <el-tabs>
          <el-tab-pane label="企业介绍" name="first" style="padding: 100px">
            <div class="company-content">
              {{ company.description }}
            </div>
          </el-tab-pane>
          <el-tab-pane label="在招岗位" name="second">
            <div class="job-list">
              {{ jobs }}
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

export default {
  name: 'Index',
  components: {StuNavBar},
  data () {
    return {
      company: {
        id: this.$route.params.companyId,
        lastUpdateTime: null,
        name: null,
        description: null,
        address: null,
        scale: null,
        industryId: null,
        image: null
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

</style>
