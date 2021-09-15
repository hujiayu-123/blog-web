<template>
  <div class="layout">
    <div class="header">
      <Header :name="name" @login="handleShowForm('login')" />
    </div>
    <div class="section">
      <router-view></router-view>
    </div>
    <el-dialog
      :title="formStatus == 'login' ? '登录' : '注册'"
      :visible.sync="FormVisible"
      width="400px"
      custom-class="dialog"
      :show-close="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          status-icon
          :model="form"
          :rules="rules"
          ref="form"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input
              placeholder="用户名"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              placeholder="密码"
              type="password"
              v-model="form.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="okpwd" v-if="formStatus == 'register'">
            <el-input
              placeholder="确认密码"
              type="password"
              v-model="form.okpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="code-form" prop="code">
            <el-input
              placeholder="验证码"
              v-model="form.code"
              autocomplete="off"
            ></el-input>
            <div
              class="code"
              v-html="captchaSvg"
              title="点击切换"
              @click="handleCaptcha"
            ></div>
          </el-form-item>
        </el-form>
        <div class="tip" v-show="formStatus == 'login'">
          <div class="forget">忘记密码？</div>
          <div class="register" @click="formStatus = 'register'">立即注册</div>
        </div>
        <div
          class="btn"
          @click="formStatus == 'login' ? handleLogin() : handleRegister()"
        >
          {{ formStatus == 'login' ? '登 录' : '注 册' }}
        </div>
        <div v-show="formStatus == 'login'">
          <el-divider class="divider"><span>社交账号登录</span></el-divider>
          <div class="login-icon">
            <i
              class="iconfont zfb icon-zhifubao"
              title="支付宝登录"
              @click="handleLoginType('zfb')"
            ></i>
            <i
              class="iconfont wb icon-weibo-copy"
              title="微博登录"
              @click="handleLoginType('wb')"
            ></i>
            <i
              class="iconfont qq icon-qq"
              title="QQ登录"
              @click="handleLoginType('qq')"
            ></i>
          </div>
        </div>
      </div>
      <div slot="title" class="dialog-title">
        <div class="title">个人博客</div>
        <div class="status">{{ formStatus == 'login' ? '登录' : '注册' }}</div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="isReady"
          @click="formStatus == 'login' ? handleLogin() : handleRegister()"
          >确 定
        </el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  data() {
    var checkpwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      lable: '',
      FormVisible: false,
      formStatus: 'normal',
      name: '',
      form: {
        name: '',
        pwd: '',
        okpwd: '',
        code: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        okpwd: [{ validator: checkpwd, trigger: 'blur' }],
      },
      captchaSvg: '',
    }
  },
  inject: ['reload'],
  methods: {
    // 第三方登录
    handleLoginType() {
      this.$message({
        type: 'warning',
        message: '功能暂未开发，敬请期待 ~ ',
      })
    },
    // 去登录页面/弹窗
    handleShowForm(status) {
      let width = window.innerWidth
      if (width > 766) {
        this.formStatus = status
        if (sessionStorage.getItem('userinfo')) {
          this.$message({
            message: '您已登录，切勿重复操作',
            type: 'warning',
          })
        } else {
          this.handleCaptcha()
          this.FormVisible = true
          if (this.$refs.form) {
            this.$refs.form.resetFields()
          }
        }
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    // 获取验证码
    handleCaptcha() {
      this.$serve.captcha().then((res) => {
        if (res.errCode == '0') {
          this.captchaSvg = res.data
        }
      })
    },
    // 注册
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$prompt('请输入管理员授权密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
            .then(({ value }) => {
              if (value == 'qwert147') {
                this.$serve
                  .register({
                    name: this.form.name,
                    pwd: this.form.okpwd,
                    code: this.form.code,
                  })
                  .then((res) => {
                    if (res) {
                      this.formStatus = 'login'
                      this.$refs.form.resetFields()
                      this.$message({
                        message: '注册成功，来登录吧',
                        type: 'success',
                      })
                    }
                  })
              } else {
                this.$message.error('密码错误，请联系管理员')
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入',
              })
            })
        }
      })
    },
    // 登录
    handleLogin() {
      console.log(111)
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$serve
            .login({
              name: this.form.name,
              pwd: this.form.pwd,
              code: this.form.code,
            })
            .then((res) => {
              if (res.errCode == '0') {
                this.FormVisible = false
                this.$message({
                  message: '登录成功',
                  type: 'success',
                })
                this.reload()
                let userinfo = { token: res.token, ...res.user }
                sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
                this.name = userinfo.name
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
    // 弹窗关闭
    handleClose() {
      this.FormVisible = false
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
  },
  components: {
    Header,
  },
}
</script>

<style lang="less">
.layout {
  .el-message {
    min-width: 200px;
    max-width: 320px;
  }
  .okpwd {
    display: none;
  }
  .layout {
    width: 100%;
    height: 100vh;
  }
  .el-dialog .el-dialog__body {
    padding: 30px;
  }
  .el-dialog .el-button {
    width: 100%;
    background: #b6976b;
    border: 0;
  }
  .dialog {
    .el-dialog__header {
      padding: 0;
    }
    .dialog-title {
      background: @themeColor;
      text-align: center;
      padding: 10px 0;
      color: #fff;
      .title {
        font-size: 25px;
      }
      .status {
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .el-form-item__content {
      line-height: 50px;
      .el-input__inner {
        height: 50px;
      }
    }
    .code-form {
      .el-form-item__content {
        display: flex;
        .el-input {
          width: calc(100% - 110px);
          margin-right: 10px;
        }
        .code {
          width: 100px;
          height: 50px;
          cursor: pointer;
        }
      }
    }
    .tip {
      display: flex;
      justify-content: center;
      color: @themeColor;
      cursor: pointer;
      div {
        margin: 0 5px;
        &:hover {
          margin: 0 5px;
          text-decoration: underline;
        }
      }
    }
    .btn {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: @themeColor;
      color: #fff;
      font-size: 20px;
      border-radius: 4px;
      margin-top: 10px;
      cursor: pointer;
    }
    .divider {
      span {
        color: #999;
      }
    }
    .login-icon {
      display: flex;
      justify-content: center;
      .iconfont {
        font-size: 25px;
        margin: 0 10px;
        cursor: pointer;
      }
      .zfb {
        color: #00aaee;
      }
      .wb {
        color: #d32f2f;
      }
      .qq {
        color: #0288d1;
      }
    }
  }
}
</style>
