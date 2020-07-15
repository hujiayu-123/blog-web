<template>
  <el-dropdown @command="handleSet">
    <span class="el-dropdown-link">
      {{ sessionName
      }}<i
        :class="
          sessionName == ''
            ? 'el-icon-arrow-down el-icon--right hidden'
            : 'el-icon-arrow-down el-icon--right'
        "
      ></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="release">发布</el-dropdown-item>
      <el-dropdown-item command="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
      sessionName: '',
    }
  },
  inject: ['reload'],
  props: ['name'],
  created() {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo) {
      this.sessionName = userinfo.name
    }
  },
  methods: {
    // 退出登录
    handleSet(command) {
      if (command == 'logout') {
        this.$message({
          message: '登出成功',
          type: 'success',
        })
        this.reload()
        if (this.$route.path == '/release') {
          this.$router.push('/')
        }
        sessionStorage.clear()
      } else {
        this.$router.push('/release')
      }
    },
  },
}
</script>
<style scoped>
.hidden {
  display: none;
}
.el-dropdown {
  position: absolute;
  right: 20px;
  margin-top: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
