<template>
  <div class="check-company">
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
            <p>姓名: {{ scope.row.company.name }}</p>
            <p>介绍: {{ scope.row.company.description }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.company.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司规模" prop="company.scale"/>
      <el-table-column align="center" label="公司行业" prop="industry.name"/>
      <el-table-column align="center" label="公司地址" prop="company.address"/>
      <el-table-column align="center" label="公司城市" prop="company.city"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="checkPass(scope.row.company.id,scope.$index)">审核通过</el-button>
          <el-button
            size="mini"
            type="danger">审核不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {checkCompany, getUncheckList} from '../../../api/company'

export default {
  name: 'CheckCompany',
  data () {
    return {
      companyList: []
    }
  },
  methods: {
    getList () {
      getUncheckList().then(res => {
        this.companyList = res.data
      })
    },
    checkPass (val, index) {
      checkCompany(val).then(() => {
        this.companyList.splice(index, 1)
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
