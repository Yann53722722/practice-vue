<template>
  <div class="search-box">
    <el-input v-model="input" placeholder="请输入内容" class="search-input">
      <el-select filterable v-model="query.city" slot="prepend" class="search-select">
        <el-option
          v-for="item in cityOptions"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select v-model="select" slot="prepend" class="search-select">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
  </div>
</template>

<script>
import {getList} from '../../../api/job'
import cities from '../../../utils/cities'

export default {
  name: 'SearchBox',
  props: {
    jobQuery: Object
  },
  data () {
    return {
      cityOptions: [],
      select: 1,
      input: null,
      selectOptions: [
        {
          value: 1,
          label: '搜岗位'
        }
      ],
      companyName: null,
      query: {
        educationRank: null,
        minSalary: null,
        maxSalary: null,
        workDay: null,
        workTime: null,
        title: null,
        city: null,
        page: 1,
        size: 10
      }
    }
  },
  created () {
    if (this.jobQuery !== null && this.jobQuery !== undefined) {
      this.query = this.jobQuery
    }
    for (let i = 0; i < cities.length; i++) {
      let province = cities[i]
      for (let j = 0; j < province.children.length; j++) {
        this.cityOptions.push(province.children[j].value)
      }
    }
  },
  methods: {
    search () {
      if (this.$route.name === 'jobs') {
        if (this.select === 1) {
          this.query.title = this.input
          getList(this.query).then(res => {
            if (res !== null && res.data.content !== null) {
              this.$emit('searchBoxData', res)
            }
          })
        } else {
          this.companyName = this.input
        }
      } else if (this.$route.name === 'index') {
        this.$router.push({
          name: 'jobs',
          params: {
            city: this.query.city,
            title: this.input
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 968px;
}
  .search-select {
    width: 180px;
    margin-left: 5px;
  }
  .search-box {
    position: absolute;
    left: 50%;
    margin-left: -481px;
    z-index: 3;
  }
  .el-input {
    position: absolute;
  }
</style>
