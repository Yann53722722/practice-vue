<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="job-filter-box">
    <el-collapse class="collapse">
      <el-collapse-item>
        <template slot="title">
          <div style="width: 968px">
            <div style="float: left">
              <span>筛选：</span>
              <!--<div>-->
                <!--<span>最低学历</span>-->
                <!--<el-tag>dd</el-tag>-->
              <!--</div>-->
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
  </div>
</template>

<script>
import IndustrySelect from '../../home/components/IndustrySelect'
export default {
  name: 'JobFilterBox',
  components: {IndustrySelect},
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
        },
        {
          value: '10',
          label: '十个月'
        }
      ]
    }
  },
  methods: {
    changeTags (value) {
      this.selectTags.educationRankTag = value
    },
    changeSalary (value) {
      this.jobQuery.minSalary = this.salary.minValue
      this.jobQuery.maxSalary = this.salary.maxValue
      this.selectTags.salaryTag = value
    },
    changeWorkDay (value) {
      this.selectTags.workDay = value
    },
    changeWorkTime (value) {
      this.selectTags.workTime = value
    }
  },
  created () {
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
  }
  .condition {
    width: 968px;
    text-align: left;
    line-height: 50px;
  }
  .select-radio {
  }
</style>
