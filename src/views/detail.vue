<template>
  <div>
    <div class="release"></div>
    <Header />
    <div
      class="content"
      v-loading="isReady"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <h1 style="margin:20px 0 15px 0;">{{ detail.title }}</h1>
      <el-image :src="require('@/assets/original.png')"></el-image>
      <a
        style="display: inline-block;position: absolute;margin: 9px 20px 20px; color:#409eff;font-size:14px"
        ><span>{{ detail.author }}</span
        ><span style="margin-left:30px;color:#999AAA">{{
          detail.timeCreate
        }}</span></a
      >
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
    console.log(this.$route.params)
    this.$axios
      .post('http://localhost:3000/blog/detail', {
        id: this.$route.params.id,
      })
      .then((res) => {
        console.log(res)
        if (res.data.errCode == '0') {
          this.detail = res.data.article
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
</style>
