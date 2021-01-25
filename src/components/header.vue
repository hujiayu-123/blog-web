<template>
  <div>
    <div class="nav">
      <div class="menu hidden-xs-only">
        <router-link to="/home" tag="p">首页</router-link>
        <router-link to="/column/zl" tag="p">专栏</router-link>
        <router-link to="/skill/js" tag="p">技术</router-link>
        <router-link to="/life/sh" tag="p">生活</router-link>
        <DropDown @login="handleShowLogin" />
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
    }
  },
  methods: {
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

<style scoped>
.menu {
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.16);
  position: fixed;
  top: 0;
  text-align: center;
}

.menu > p {
  display: inline-block;
  width: 150px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
.menu > p:nth-child(4) {
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
