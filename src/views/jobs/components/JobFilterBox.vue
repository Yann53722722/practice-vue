<template>
  <div class="job-filter-box">
    <div class="search-box">
      <search-box
        :job-query="jobQuery"
        v-on:searchBoxData="searchBoxData"
      ></search-box>
    </div>
    <el-collapse class="collapse">
      <el-collapse-item>
        <template slot="title">
          <div style="width: 968px">
            <div style="float: left">
              <span>筛选：</span>
              <span>
                最低学历
                <el-tag
                  style="margin-left: 4px">
                {{ selectTags.educationRankTag }}
              </el-tag>
              </span>
              <span>
                薪资范围
                <el-tag
                  style="margin-left: 4px">
                {{ selectTags.salaryTag }}
                </el-tag>
              </span>
              <span>
                实习天数
                <el-tag
                  style="margin-left: 4px">
                {{ selectTags.workDay }}
                </el-tag>
              </span>
              <span>
                实习月份
                <el-tag
                  style="margin-left: 4px">
                {{ selectTags.workTime }}
                </el-tag>
              </span>
            </div>
            <div style="width: 60px;color: #409EFF;float: right">更多选项</div>
          </div>
        </template>
        <div class="condition">
          <div>
            <span>
            最低学历：
            </span>
            <el-radio-group v-model="jobQuery.educationRank">
              <el-radio-button
                @change.native="changeTags(rank.label)"
                class="select-radio"
                v-for="rank in educationRanks"
                :key="rank.value"
                :label="rank.value"
              >{{ rank.label }}</el-radio-button>
            </el-radio-group>
          </div>
          <hr class="style-one"/>
          <div>
            <span>薪资范围：</span>
            <el-radio-group v-model="salary">
              <el-radio-button
                @change.native="changeSalary(rank.label)"
                class="select-radio"
                v-for="rank in salaryRange"
                :key="rank.label"
                :label="rank.value"
              >{{ rank.label }}</el-radio-button>
            </el-radio-group>
          </div>
          <hr class="style-one"/>
          <div>
            <span>实习天数：</span>
            <el-radio-group v-model="jobQuery.workDay">
              <el-radio-button
                @change.native="changeWorkDay(rank.label)"
                class="select-radio"
                v-for="rank in workDayOptions"
                :key="rank.label"
                :label="rank.value"
              >{{ rank.label }}</el-radio-button>
            </el-radio-group>
          </div>
          <hr class="style-one"/>
          <div>
            <span>实习月份：</span>
            <el-radio-group v-model="jobQuery.workTime">
              <el-radio-button
                @change.native="changeWorkTime(rank.label)"
                class="select-radio"
                v-for="rank in workTimeOptions"
                :key="rank.label"
                :label="rank.value"
              >{{ rank.label }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div :style="{ height: height + 'px', marginTop: '20px' }">
      <job-list :job-list="jobList"></job-list>
    </div>
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
import IndustrySelect from '../../home/components/IndustrySelect'
import JobList from './JobList'
import {getList} from '../../../api/job'
import SearchBox from '../../home/components/SearchBox'
export default {
  name: 'JobFilterBox',
  components: {SearchBox, JobList, IndustrySelect},
  data () {
    return {
      selectTags: {
        educationRankTag: '不限',
        salaryTag: '不限',
        workDay: '不限',
        workTime: '不限'
      },
      salary: {
        minValue: null,
        maxValue: null
      },
      jobQuery: {
        educationRank: null,
        minSalary: null,
        jobTypeId: null,
        maxSalary: null,
        workDay: null,
        workTime: null,
        title: null,
        city: null,
        page: 1,
        size: 10
      },
      educationRanks: [
        {
          value: null,
          label: '不限'
        },
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
      salaryRange: [
        {
          value: {
            minValue: null,
            maxValue: null
          },
          label: '不限'
        },
        {
          value: {
            minValue: null,
            maxValue: 100
          },
          label: '100以下'
        },
        {
          value: {
            minValue: 100,
            maxValue: 150
          },
          label: '100~150'
        },
        {
          value: {
            minValue: 150,
            maxValue: 200
          },
          label: '150~200'
        },
        {
          value: {
            minValue: 200,
            maxValue: 300
          },
          label: '200~300'
        },
        {
          value: {
            minValue: 300,
            maxValue: null
          },
          label: '300以上'
        }
      ],
      workDayOptions: [
        {
          value: null,
          label: '不限'
        },
        {
          value: '1',
          label: '一天'
        },
        {
          value: '2',
          label: '两天'
        },
        {
          value: '3',
          label: '三天'
        },
        {
          value: '4',
          label: '四天'
        },
        {
          value: '5',
          label: '五天'
        },
        {
          value: '6',
          label: '六天'
        },
        {
          value: '7',
          label: '七天'
        }
      ],
      workTimeOptions: [
        {
          value: null,
          label: '不限'
        },
        {
          value: '1',
          label: '一个月'
        },
        {
          value: '2',
          label: '两个月'
        },
        {
          value: '3',
          label: '三个月'
        },
        {
          value: '4',
          label: '四个月'
        },
        {
          value: '5',
          label: '五个月'
        },
        {
          value: '6',
          label: '六个月'
        },
        {
          value: '7',
          label: '七个月'
        },
        {
          value: '8',
          label: '八个月'
        },
        {
          value: '9',
          label: '九个月'
        }
      ],
      jobList: null,
      height: null,
      tableStyle: {
        height: this.height + 'px',
        width: '24px'
      },
      total: null
    }
  },
  methods: {
    changeTags (value) {
      this.selectTags.educationRankTag = value
      this.jobQuery.page = 1
      this.getJobList()
    },
    changeSalary (value) {
      this.jobQuery.minSalary = this.salary.minValue
      this.jobQuery.maxSalary = this.salary.maxValue
      this.selectTags.salaryTag = value
      this.jobQuery.page = 1
      this.getJobList()
    },
    changeWorkDay (value) {
      this.selectTags.workDay = value
      this.jobQuery.page = 1
      this.getJobList()
    },
    changeWorkTime (value) {
      this.selectTags.workTime = value
      this.jobQuery.page = 1
      this.getJobList()
    },
    getJobList () {
      getList(this.jobQuery).then(res => {
        this.jobList = res.data.content
        this.height = res.data.content.length * 100
        this.total = res.data.totalElements
        this.jobQuery.jobTypeId = null
      })
    },
    currentChange (val) {
      this.jobQuery.page = val
      this.getJobList()
    },
    searchBoxData (res) {
      this.jobList = res.data.content
      this.height = res.data.content.length * 100
      this.total = res.data.totalElements
    }
  },
  created () {
    if (this.$route.params.title !== undefined) {
      this.jobQuery.title = this.$route.params.title
    }
    if (this.$route.params.city !== undefined) {
      this.jobQuery.city = this.$route.params.city
    }
    if (this.$route.params.jobTypeId !== undefined) {
      this.jobQuery.jobTypeId = this.$route.params.jobTypeId
    }
    this.getJobList()
  }
}
</script>

<style scoped>
  .job-filter-box {
    width: 968px;
    left: 50%;
    margin-left: -481px;
    position: absolute;
  }
  .collapse {
    width: 968px;
    margin-top: 10px;
  }
  .condition {
    width: 968px;
    text-align: left;
    line-height: 50px;
  }
  .select-radio {
  }
  .style-one {

    border: 0;

    height: 0;

    border-top: 1px solid rgba(0, 0, 0, 0.1);

    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .el-collapse-item__arrow {
    display: none;
  }
  i {
    display: none;
  }
  .search-box {
    height: 40px;
  }
</style>
