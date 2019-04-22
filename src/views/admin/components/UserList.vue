<template>
  <div>
    <el-table :data="userList">
      <el-table-column align="center" label="用户名" prop="username"/>
      <el-table-column
        label="用户角色"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            style="margin-right: 3px"
            v-for="item in scope.row.authorities"
            :key="item.id"
          >
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
          >
            修改角色
          </el-button>
          <el-button
            size="mini"
            type="danger">
            账号停用
          </el-button>
        </template>
      </el-table-column>
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
import {getUserList} from '../../../api/user'

export default {
  name: 'UserList',
  data () {
    return {
      userList: null,
      query: {
        page: 1,
        size: 10
      },
      total: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getUserList(this.query).then(res => {
        this.userList = res.data.content
        this.total = res.data.totalElements
      })
    },
    currentChange (val) {
      this.query.page = val
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
