<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
  },
  components: {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.router-link-active {
  font-weight: bold;
  background: rgba(0, 0, 0, 0.15);
}
.bubbleDom {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  top: 0;
  position: absolute;
}
.bubbleItemDom {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* background: rgba(255, 255, 255, 0.5); */
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 1) 80%
  );
  position: absolute;
}
.bubbleItemDom::after {
  content: '';
  position: absolute;
  top: 20%;
  right: 25%;
  width: 33%;
  height: 33%;
  border: 3px solid;
  border-color: rgba(255, 255, 255, 0.8) transparent transparent transparent;
  border-radius: 50%;
  transform: rotate(45deg);
}
.bubbleItemDom-a {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  background: url(./assets/images/logo.jpg);
  background-size: cover;
}
</style>
