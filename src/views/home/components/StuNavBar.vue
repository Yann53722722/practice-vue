<template>
  <div class="stu-nav-bar">
    <div class="menu">
      <img style="height: 50px" src="../../../assets/logo.png">
    </div>
    <div class="menu menu-item">
      <router-link style="height: 50px;margin-top: 150px" :to="{ name: 'index'}">
        <span style="font-size: 40px">首页</span>
      </router-link>
    </div>
    <div class="menu menu-item">
      <router-link style="height: 50px;margin-top: 150px" :to="{ name: 'stu', params: { userId: userId }}">
        <span style="font-size: 40px">个人中心</span>
      </router-link>
    </div>
    <div class="menu switch" v-if="userId === ''">
      <router-link style="height: 50px;margin-top: 150px" :to="{ name: 'login', query: {role: 'com'}}">
        <el-button type="primary" style="width: 100px">企业入口</el-button>
      </router-link>
      <router-link style="height: 50px;margin-top: 150px;margin-left: 6px" :to="{ name: 'login', query: {role: 'stu'}}">
        <el-button type="primary" style="width: 100px">学生入口</el-button>
      </router-link>
    </div>
    <div class="user" v-else>
      {{ username }}用户已登陆
      <el-button type="danger" style="margin-left: 3px" @click="logout" size="mini">退出登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StuNavBar',
  data () {
    return {
      userId: this.$store.getters.userId,
      username: this.$store.getters.username
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('handleLogout').then(() => {
        if (this.$route.path === '/') {
          this.userId = ''
          this.username = ''
        } else {
          this.$router.push({
            name: 'index'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .stu-nav-bar {
    height: 50px;
    position: absolute;
    width: 968px;
    left: 50%;
    margin-left: -480px;
    z-index: 4;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .menu {
    float: left;
  }
  .menu-item {
    margin-left: 10px;
  }
  .switch {
    margin-left: 320px;
    padding-top: 12px;
  }
  .user {
    float: right;
    margin-top: 15px;
  }
</style>
