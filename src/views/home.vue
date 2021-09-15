<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="home-list">
      <div class="home-list-item"></div>
      <div class="home-list-item"></div>
    </div>
    <!-- <div class="bg">
      <div class="bg-op">
        <div class="text">
          <p>"GOOD GOOD STUDY</p>
          <p>DAY DAY UP"</p>
        </div>
      </div>
    </div>
    <div class="footer"></div> -->
  </div>
</template>
<script>
import '../plugins/bubble'
export default {
  mounted() {
    window.bubble()
  },
  destroyed() {
    window.bubble('stop')
  },
}
</script>
<style scoped lang="less">
.home {
  .home-bg {
    width: 100%;
    height: 100vh;
    background: url(../assets/images/bg.jpg) no-repeat bottom center;
    background-attachment: fixed;
    background-size: cover;
    text-align: center;
  }
  .bg {
    width: 100%;
    height: 350px;
    background: url(../assets/images/bg.jpg) no-repeat center center;
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
}
</style>
