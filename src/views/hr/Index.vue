<template>
  <div class="hr">
    <div class="header">
      <com-nav-bar></com-nav-bar>
    </div>
    <div class="body" >
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
            <span style="float: right">
              <el-button size="mini" type="primary" @click="handleEditCompanyOpen">编辑</el-button>
            </span>
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
    <el-dialog
      :visible="companyInfoDialogVisible"
      :before-close="handleClose"
      title="公司信息">
      <el-form
        :model="formData"
      >
        <el-form-item label="公司名字">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="公司规模">
          <el-select v-model="formData.scale" placeholder="请选择">
            <el-option
              v-for="item in scaleOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司行业">
          <el-cascader
            @change="handleChange"
            :show-all-levels="false"
            expand-trigger="hover"
            v-model="industryOption"
            change-on-select
            :options="industryOptions"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input type="textarea" :rows="5" v-model="formData.description"/>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="formData.city"/>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="formData.address"/>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="updateCompany">保存</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ComNavBar from './components/ComNavBar'
import {getByUserId, updateOne} from '../../api/company'
import {getAll} from '../../api/industry'
export default {
  name: 'Index',
  components: {ComNavBar},
  data () {
    return {
      props: {
        label: 'industry.name',
        value: 'id',
        children: 'industries'
      },
      scaleOptions: [
        '少于15人',
        '15~50人',
        '50~150人',
        '150~500人',
        '500~2000人',
        '2000人以上'
      ],
      companyInfoDialogVisible: false,
      userId: this.$route.params.userId,
      tabActive: 'first',
      company: {
        id: null,
        lastUpdateTime: null,
        name: null,
        description: null,
        address: null,
        scale: null,
        industryId: null,
        image: null,
        city: null
      },
      formData: {
        id: null,
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
      },
      industryList: [],
      industryOptions: [],
      industryOption: []
    }
  },
  created () {
    this.getOneByUserId()
    this.getIndustryList()
  },
  methods: {
    getOneByUserId () {
      getByUserId(this.userId).then(res => {
        this.company = res.data.company
        this.jobs = res.data.jobs
        this.industry = res.data.industry
      })
    },
    handleEditCompanyOpen () {
      this.resetForm()
      this.companyInfoDialogVisible = true
      let key
      for (key in this.company) {
        this.formData[key] = this.company[key]
      }
      this.industryOption[0] = this.industry.industry.id
      this.industryOption[1] = this.industry.id
    },
    resetForm () {
      this.industryOption = []
      this.formData = {
        id: null,
        lastUpdateTime: null,
        name: null,
        description: null,
        address: null,
        scale: null,
        industryId: null,
        image: null,
        city: null
      }
    },
    handleClose () {
      this.companyInfoDialogVisible = false
      this.resetForm()
      this.industryOption = []
    },
    getIndustryList () {
      getAll().then(res => {
        this.industryList = res.data
        for (let i = 0; i < this.industryList.length; i++) {
          let industryObj = {
            value: this.industryList[i].industry.id,
            label: this.industryList[i].industry.name,
            children: []
          }
          for (let j = 0; j < this.industryList[i].industries.length; j++) {
            let childrenObj = {
              value: this.industryList[i].industries[j].id,
              label: this.industryList[i].industries[j].name
            }
            industryObj.children.push(childrenObj)
          }
          this.industryOptions.push(industryObj)
        }
      })
    },
    handleChange () {
      if (this.industryOption.length > 1) {
        this.formData.industryId = this.industryOption[1]
      }
    },
    updateCompany () {
      updateOne(this.formData).then(res => {
        this.company = res.data
        this.companyInfoDialogVisible = false
        this.resetForm()
      })
    }
  }
}
</script>

<style scoped>
  .hr {
    min-width: 1024px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
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
