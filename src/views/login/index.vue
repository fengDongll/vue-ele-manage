<template>
  <div class="login-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
          <h2 class="login-title">天将明管理系统</h2>
          <el-form-item label="帐号" prop="username">
              <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {login, getUserInfo} from '@/api/login'
export default {
    data() {
      return {
        form: {
            username: '',
            password: ''
         },
         rules: {
             username: [
                  {required: true, message: '帐号不能为空', trigger: 'blur' },
             ],
             password: [
                 {required: true, message: '密码不能为空', trigger: 'blur' },
             ]
         }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
            // console.log(valid)
            if (valid) {
                // 提交表单给后台进行验证是否正确
                this.$store.dispatch('Login', this.form).then(response => {
                     // response 就是响应回来的那个真实对象
                    if(response.flag) {
                        // 前往首页
                        this.$router.push('/')
                    }else {
                        this.$message({
                            message: response.message,
                            type: 'waring'
                        })
                    }
                }).catch(error => {

                })
            }else{
                console.log('验证失败')
                return false
            }
        })
    }
  }
}
</script>

<style scoped>
.login-form {
    width: 350px;
   margin: 160px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 28px;
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/login.jpg')
}
.login-title {
    color: #303133;
    text-align: center;
}
</style>