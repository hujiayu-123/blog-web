<template>
  <div>
    <div class="nav">
      <div :class="isHome ? 'hidden-xs-only' : 'menu hidden-xs-only'">
        <div v-if="isHome">
          <div class="home-bg">
            <img
              class="logo"
              :src="require('@/assets/images/logo.jpg')"
              alt=""
            />
            <router-link to="/home" tag="div">
              <el-tooltip effect="dark" content="首页" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </router-link>
            <router-link to="/column/zl" tag="div">
              <el-tooltip effect="dark" content="专栏" placement="bottom">
                <i class="el-icon-s-promotion"></i>
              </el-tooltip>
            </router-link>
            <router-link to="/skill/js" tag="div">
              <el-tooltip effect="dark" content="技术" placement="bottom">
                <i class="el-icon-document"></i>
              </el-tooltip>
            </router-link>
            <router-link to="/life/sh" tag="div">
              <el-tooltip effect="dark" content="生活" placement="bottom">
                <i class="el-icon-camera-solid"></i>
              </el-tooltip>
            </router-link>
            <p class="tip" @click="handleIsLogin">想写点什么。。。</p>
          </div>
        </div>
        <div v-else>
          <router-link to="/home" tag="p">首页</router-link>
          <router-link to="/column/zl" tag="p">专栏</router-link>
          <router-link to="/skill/js" tag="p">技术</router-link>
          <router-link to="/life/sh" tag="p">生活</router-link>
          <DropDown @login="handleShowLogin" />
        </div>
      </div>
      <div class="hidden-sm-and-up xs-menu">
        <div :class="this.isCollapse ? 'header' : 'header showHeader'">
          <el-button
            v-model="isCollapse"
            @click="isCollapse = !isCollapse"
            icon="el-icon-s-unfold"
          ></el-button>
          <DropDown @login="handleShowLogin" />
        </div>
        <el-menu
          router
          :class="
            this.isCollapse
              ? 'el-menu-vertical-demo none'
              : 'el-menu-vertical-demo showMenu'
          "
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          default-active="/"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/column/zl">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">专栏</span>
          </el-menu-item>
          <el-menu-item index="/skill/js">
            <i class="el-icon-document"></i>
            <span slot="title">技术</span>
          </el-menu-item>
          <el-menu-item index="/life/sh">
            <i
              class="el-icon-camera-solid
  "
            ></i>
            <span slot="title">生活</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import DropDown from './dropDown'
export default {
  data() {
    return {
      isCollapse: true,
      sessionName: '',
      isHome: true,
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.handleIsHome(val.path)
      },
      deep: true,
    },
  },
  mounted() {
    this.handleIsHome(this.$route.path)
  },
  methods: {
    handleIsHome(val) {
      if (val === '/home') {
        this.isHome = true
      } else {
        this.isHome = false
      }
    },
    handleIsLogin() {
      if (sessionStorage.getItem('userinfo')) {
        let routeUrl = this.$router.resolve({
          path: `/release`,
        })
        window.open(routeUrl.href, '_blank')
      } else {
        this.handleShowLogin()
      }
    },
    handleShowLogin() {
      this.$emit('login', true)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // handleLogout () {
    //   // this.sessionName = ''
    //   this.reload()
    //   sessionStorage.clear()
    // }
  },
  components: {
    DropDown,
  },
}
</script>

<style scoped lang="less">
.menu {
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.16);
  position: fixed;
  top: 0;
  text-align: center;
  z-index: 99;
}
.home-bg {
  width: 400px;
  height: 200px;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -200px;
  border-radius: 20px;
  box-shadow: 0px 0px 14px #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  z-index: 99;
  .logo {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    left: 50%;
    margin-left: -50px;
    top: -50px;
  }
  i {
    font-size: 30px;
  }
  & > div {
    text-align: center;
    width: 50px;
    height: 50px;
    background: rgba(102, 102, 102, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 50px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 14px #c0c0c0;
    }
  }
  .tip {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
    color: #c0c0c0;
    cursor: pointer;
    &:hover {
      color: @themeColor;
    }
  }
}
.menu p {
  display: inline-block;
  width: 150px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.menu p:nth-child(4) {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 200px;
  background: rgba(255, 255, 255, 0.8);
}
.none {
  display: none;
}
.xs-menu {
  width: 100%;
}
.xs-menu .el-menu {
  position: absolute;
}
.header {
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.14);
  position: fixed;
}
.header .el-button {
  float: left;
  background: transparent;
  border: 0;
  font-size: 30px;
  color: white;
}
.xs-menu .el-menu {
  background: rgba(0, 0, 0, 0.14);
  border: 0;
}
.xs-menu .showMenu {
  background: rgba(0, 0, 0, 0.55);
  margin-top: 60px;
  position: fixed;
}
.showHeader {
  background: rgba(0, 0, 0, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.xs-menu .showMenu .el-menu-item {
  width: 50%;
  height: 100px;
  float: left;
  line-height: 100px;
  text-align: center;
}
.xs-menu .el-menu-item {
  color: white;
}
.xs-menu i {
  color: white;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.16) !important;
  font-weight: bold;
}
</style>
