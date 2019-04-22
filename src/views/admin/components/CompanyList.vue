<template>
  <div>
    <el-table
      :data="companyList"
    >
      <el-table-column
        label="公司名称"
        width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>介绍: {{ scope.row.description }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司规模" prop="scale"/>
      <el-table-column align="center" label="公司行业" prop="industry.name"/>
      <el-table-column align="center" label="公司地址" prop="address"/>
      <el-table-column align="center" label="公司城市" prop="city"/>
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
import {queryForList} from '../../../api/company'

export default {
  name: 'CompanyList',
  data () {
    return {
      companyList: null,
      query: {
        page: 1,
        size: 10
      },
      total: null
    }
  },
  created () {
    this.getCompanyList()
  },
  methods: {
    getCompanyList () {
      queryForList(this.query).then(res => {
        this.companyList = res.data.content
        this.total = res.data.totalElements
      })
    },
    currentChange (val) {
      this.query.page = val
      this.getCompanyList()
    }
  }
}
</script>

<style scoped>

</style>
