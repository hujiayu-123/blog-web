<template>
  <div class="layout">
    <div class="header">
      <Header :name="name" />
      <div class="title">
        <p class="blog">个人博客</p>
        <p class="author">胡佳钰</p>
        <el-button type="success" width="100px" round @click="handleShowForm('login')">登录</el-button>
        <el-button type="warning" @click="handleShowForm('register')" round>注册</el-button>
      </div>
    </div>
    <div class="section"></div>
    <div class="bg">
      <div class="bg-op">
        <div class="text">
          <p>"GOOD GOOD STUDY</p>
          <p>DAY DAY UP"</p>
        </div>
      </div>
    </div>
    <div class="footer"></div>
    <el-dialog :title="formStatus == 'login' ? '登录' : '注册'" :visible.sync="FormVisible" width="40vh"
      custom-class="dialog">
      <el-form status-icon :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="okpwd" :class="formStatus == 'register' ? null : 'okpwd'">
          <el-input type="password" v-model="form.okpwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isReady" @click="formStatus == 'login'?handleLogin():handleRegister()">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  data () {
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
      isReady: false,
      name: '',
      form: {
        name: '',
        pwd: '',
        okpwd: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        okpwd: [{ validator: checkpwd, trigger: 'blur' }],
      },
    }
  },
  inject: ['reload'],
  methods: {
    handleShowForm (status) {
      this.formStatus = status

      if (this.formStatus == 'login') {
        if (sessionStorage.getItem('userinfo')) {
          this.$message({
            message: '您已登录，切勿重复操作',
            type: 'warning'
          });
        } else {
          this.FormVisible = true

          if (this.$refs.form) {
            this.$refs.form.resetFields()
          }
        }
      } else {
        this.$prompt('请输入管理员授权密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (value == 'qwert147') {
            this.FormVisible = true

            if (this.$refs.form) {
              this.$refs.form.resetFields()
            }
          } else {
            this.$message.error("密码错误，请联系管理员");
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }

    },
    // 注册
    handleRegister () {
      this.isReady = true
      this.$axios
        .post('http://localhost:3000/blog/register', {
          name: this.form.name,
          pwd: this.form.okpwd,
        })
        .then((res) => {
          this.isReady = false
          console.log(res)
          if (res.data) {
            this.FormVisible = false
            this.$message({
              message: '注册成功',
              type: 'success'
            });
          }
        })
    },
    // 登录
    handleLogin () {
      this.isReady = true
      this.$axios.post('http://localhost:3000/blog/login', {
        name: this.form.name,
        pwd: this.form.pwd
      }).then((res) => {
        this.isReady = false
        if (res.data.errCode == "0") {
          this.FormVisible = false
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.reload()
          let userinfo = { token: res.data.token, ...res.data.user, }
          sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
          this.name = userinfo.name
        } else {
          this.$message({
            message: res.data.errMsg,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('登录超时，请稍候重试')
      })
    },
  },
  components: {
    Header,
  },
}
</script>

<style>
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
.header {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat bottom center;
  background-attachment: fixed;
  background-size: cover;
  text-align: center;
}
.header .title {
  height: 200px;
  margin: 200px auto;
}
.header .title .blog {
  font-size: 60px;
  color: rgba(255, 255, 255, 0.8);
}
.header .title .author {
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  margin-top: 10px;
}
.header .title > .el-button {
  margin-top: 30px;
}
.el-dialog .el-dialog__body {
  padding: 0px 20px;
}
.el-dialog .el-button {
  width: 100%;
  background: #b6976b;
  border: 0;
}
.section {
  width: 100%;
  height: 1000px;
  background: white;
}
.bg {
  width: 100%;
  height: 350px;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-attachment: fixed;
  text-align: center;
  background-size: cover;
}
.bg .bg-op {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  overflow: hidden;
}
.bg .bg-op .text {
  height: 150px;
  width: 90%;
  margin: 100px auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.bg .bg-op .text > p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  margin-top: 20px;
}
.footer {
  width: 100%;
  height: 300px;
  background: black;
}
</style>
