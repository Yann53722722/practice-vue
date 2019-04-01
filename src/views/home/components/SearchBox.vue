<template>
  <div class="search-box">
    <el-input v-model="input" placeholder="请输入内容" class="search-input">
      <el-select v-model="query.city" slot="prepend" class="search-select">
        <el-option label="成都" value="成都"></el-option>
        <el-option label="北京" value="北京"></el-option>
        <el-option label="上海" value="上海"></el-option>
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

export default {
  name: 'SearchBox',
  props: {
    jobQuery: Object
  },
  data () {
    return {
      select: 1,
      input: null,
      selectOptions: [
        {
          value: 1,
          label: '搜岗位'
        },
        {
          value: 2,
          label: '搜公司'
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
          console.log(this.$route.name)
          console.log(this.companyName)
        }
      } else if (this.$route.name === 'index') {
        console.log(this.query.title)
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
