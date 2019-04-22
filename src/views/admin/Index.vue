<template>
  <el-container :style="height">
    <el-aside width="200px">
      <el-menu
        style="text-align: left"
        background-color="#D3DCE6"
        router
        :default-active="this.$router.path"
      >
        <el-menu-item
          index="/admin"
        >
          首页
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            公司管理
          </template>
          <el-menu-item
            index="/admin/check-company"
          >
            公司审核
          </el-menu-item>
          <el-menu-item
            index="/admin/company-list"
          >
            公司列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            岗位管理
          </template>
          <el-menu-item
            index="/admin/check-job"
          >
            岗位审核
          </el-menu-item>
          <el-menu-item
            index="/admin/job-list"
          >
            岗位列表
          </el-menu-item>
        </el-submenu>
        <el-submenu
          index="3"
        >
          <template slot="title">用户管理</template>
          <el-menu-item
            index="/admin/user-list"
          >用户列表</el-menu-item>
        </el-submenu>
        <el-submenu
          index="4"
        >
          <template slot="title">权限管理</template>
          <el-menu-item
          >角色管理</el-menu-item>
          <el-menu-item
          >授权管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import StuNavBar from '../home/components/StuNavBar'
export default {
  name: 'Index',
  components: {StuNavBar},
  data () {
    return {
      height: {
        height: window.innerHeight - 16 + 'px'
      }
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 60px;
  }
  .el-breadcrumb {
    align-self: center;
  }
</style>
