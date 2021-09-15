<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="sec">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"
            autocomplete="off"
            placeholder="密码"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <el-form-item class="code-lay" prop="code">
          <el-input
            v-model="ruleForm.code"
            autocomplete="off"
            placeholder="验证码"
          ></el-input>
          <div class="code" v-html="captchaSvg" @click="handleCaptcha"></div>
        </el-form-item>
      </el-form>
      <div class="btn" @click="handleSubmit">登 录</div>
      <div class="tip" @click="handleToRegister">
        还没有账号？立即注册
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        pwd: '',
        code: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      captchaSvg: '',
    }
  },
  mounted() {
    this.handleCaptcha()
  },
  methods: {
    // 获取验证码
    handleCaptcha() {
      this.$serve.captcha().then((res) => {
        if (res.errCode == '0') {
          this.captchaSvg = res.data
        }
      })
    },
    // 登录
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$serve
            .login({
              name: this.ruleForm.name,
              pwd: this.ruleForm.pwd,
              code: this.ruleForm.code,
            })
            .then((res) => {
              if (res.errCode == '0') {
                this.FormVisible = false
                this.$message({
                  message: '登录成功',
                  type: 'success',
                })
                let userinfo = { token: res.token, ...res.user }
                sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
                this.$router.push({ path: '/home' })
              } else {
                this.$message({
                  message: res.errMsg,
                  type: 'warning',
                })
              }
            })
        }
      })
    },
    // 去注册页
    handleToRegister() {
      this.$router.push({ path: '/register' })
    },
  },
}
</script>
<style lang="less">
.login {
  .login-bg {
    width: 100%;
    height: 50vh;
    background: url(../assets/images/bg.jpg) no-repeat top;
    background-size: cover;
  }
  .sec {
    padding: 30px;
    .demo-ruleForm {
      .el-input__inner {
        border: 0;
        border-bottom: 1px solid #dcdfe6;
      }
      .code-lay {
        .el-form-item__content {
          display: flex;
          .el-input {
            width: calc(100% - 110px);
            margin-right: 10px;
          }
          .code {
            width: 100px;
            height: 40px;
          }
        }
      }
    }
    .btn {
      width: 100%;
      height: 40px;
      background: @themeColor;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      border-radius: 4px;
      cursor: pointer;
    }
    .tip {
      font-size: 14px;
      margin-top: 10px;
      color: #999;
    }
  }
}
</style>
