<template>
  <div>
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password" :show-password="true"></el-input>
      </el-form-item>
      <el-button @click="userLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import {login} from '../../api/login'

export default {
  name: 'Index',
  data () {
    return {
      loginData: {
        username: null,
        password: null,
        data: null
      }
    }
  },
  created () {
  },
  methods: {
    userLogin () {
      login(this.loginData.username, this.loginData.password).then(res => {
        this.data = res
        this.$store.dispatch('HandleLogin', this.data).then(() => {
          this.$router.push({
            name: 'index'
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
