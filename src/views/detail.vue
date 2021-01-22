<template>
  <div class="detail">
    <Header />
    <div class="release"></div>
    <div
      class="content"
      v-loading="isReady"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <h1>{{ detail.title }}</h1>
      <div class="auth-info">
        <el-image :src="require('@/assets/original.png')"></el-image>
        <a
          style="display: inline-block;position: absolute;margin: 9px 20px 20px; color:#409eff;font-size:14px"
          ><span>{{ detail.author }}</span
          ><span style="margin-left:30px;color:#999AAA">{{
            detail.timeCreate
          }}</span></a
        >
      </div>
      <div style="margin-top:15px" v-html="detail.article"></div>
    </div>
  </div>
</template>
<script>
import Header from '../components/header'
export default {
  data() {
    return {
      detail: {},
      isReady: true,
    }
  },
  created() {
    this.$serve
      .detail({
        id: this.$route.params.id,
      })
      .then((res) => {
        if (res.errCode == '0') {
          this.detail = res.article
          this.isReady = false
        }
      })
  },
  components: {
    Header,
  },
}
</script>
<style>
.detail {
  overflow: hidden;
}
.content .el-image__inner {
  width: 40px;
}
.el-loading-parent--relative {
  position: static !important;
}
.content {
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: left;
  margin-top: 80px;
  background: floralwhite;
  border-radius: 6px;
  padding: 20px;
  min-height: calc(100vh - 80px);
}
.release {
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  position: fixed;
}
.auth-info {
  background: #f0f0f0;
  padding: 5px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
