<template>
  <div class="register">
    <div class="register-bg"></div>
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
        <el-form-item prop="okpwd">
          <el-input
            v-model="ruleForm.okpwd"
            type="password"
            autocomplete="off"
            placeholder="确认密码"
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
      <div class="btn" @click="handleSubmit">注 册</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkpwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pwd: '',
        code: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        okpwd: [{ validator: checkpwd, trigger: 'blur' }],
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
    // 注册
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$prompt('请输入管理员授权密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            if (value == 'qwert147') {
              this.$serve
                .register({
                  name: this.ruleForm.name,
                  pwd: this.ruleForm.okpwd,
                  code: this.ruleForm.code,
                })
                .then((res) => {
                  if (res) {
                    this.$message({
                      message: '注册成功，来登录吧',
                      type: 'success',
                    })
                    this.$router.push({ path: '/login' })
                  }
                })
            } else {
              this.$message.error('密码错误，请联系管理员')
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="less">
.register {
  .register-bg {
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
  }
}
</style>
