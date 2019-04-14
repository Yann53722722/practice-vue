<template>
  <div class="login">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="userLogin" type="primary">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '../../../api/login'
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    userLogin () {
      login(this.loginData.username, this.loginData.password).then(res => {
        this.data = res
        this.$store.dispatch('HandleLogin', this.data).then(() => {
          this.$router.push({
            name: 'admin'
          })
          // if (this.role === 'stu') {
          //   this.$router.push({
          //     name: 'index'
          //   })
          // } else if (this.role === 'com') {
          //   this.$router.push({
          //     name: 'hr',
          //     params: {
          //       userId: this.data.data.user.id
          //     }
          //   })
          // }
        })
      })
    }
  }
}
</script>

<style scoped>
  .login {
    width: 400px;
    height: 1000px;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -200px;
    position: absolute;
  }
</style>
