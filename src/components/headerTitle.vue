<template>
  <div>
    <div class="headerTitle">
      <Header />
    </div>
  </div>
</template>
<script>
import Header from './header'
export default {
  components: {
    Header,
  },
}
</script>
<style scoped>
.headerTitle {
  width: 100%;
  height: 350px;
  background: url(../assets/images/bg.jpg) no-repeat center bottom;
  background-attachment: fixed;
  text-align: center;
  background-size: cover;
}
</style>
