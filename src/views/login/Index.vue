<template>
  <div class="login">
    <el-form :label-position="position" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="registerDialogOpen">注册</el-button>
        <el-button @click="userLogin" type="primary">登陆</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible="registerDialogVisible"
      title="注册"
      :before-close="handleClose"
    >
      <el-form
        label-position="right"
        label-width="80px"
        status-icon
        :rules="rules"
        ref="registerData"
        :model="registerData"
      >
        <el-form-item label="用户类型">
          <el-radio-group v-model="registerType">
            <el-radio label="student">学生账号</el-radio>
            <el-radio label="company">企业账号</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="registerData.password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwordRepeat">
          <el-input type="password" autocomplete="off" v-model="registerData.passwordRepeat" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleRegister('registerData')" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {login} from '../../api/login'
import {addUser} from '../../api/user'

export default {
  name: 'Index',
  data () {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        return callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerData.passwordRepeat !== '') {
          this.$refs.registerData.validateField('passwordRepeat')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwordRepeat: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
      registerDialogVisible: false,
      loginData: {
        username: null,
        password: null
      },
      data: null,
      registerData: {
        username: '',
        password: '',
        passwordRepeat: ''
      },
      registerType: 'student',
      position: 'right',
      role: this.$route.query.role
    }
  },
  created () {
  },
  methods: {
    userLogin () {
      login(this.loginData.username, this.loginData.password).then(res => {
        this.data = res
        this.$store.dispatch('HandleLogin', this.data).then(() => {
          if (this.role === 'stu') {
            this.$router.push({
              name: 'index'
            })
          } else if (this.role === 'com') {
            this.$router.push({
              name: 'hr',
              params: {
                userId: this.data.data.user.id
              }
            })
          }
        })
      })
    },
    registerDialogOpen () {
      this.resetRegisterData()
      this.registerDialogVisible = true
    },
    handleClose () {
      this.registerDialogVisible = false
      this.resetRegisterData()
    },
    resetRegisterData () {
      this.registerData = {
        username: '',
        password: '',
        passwordRepeat: ''
      }
    },
    handleRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.registerData.username, this.registerData.password, this.registerType).then(() => {
            this.loginData.username = this.registerData.username
            this.loginData.password = this.registerData.password
            if (this.registerType === 'student') {
              this.role = 'stu'
              this.userLogin()
            } else if (this.registerType === 'company') {
              this.role = 'com'
              this.userLogin()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
