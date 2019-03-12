<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
    font-family: "Raleway", Helvetica, Arial, sans-serif;
    -webkit-font-feature-settings: "lunm";
    font-feature-settings: "lunm";
    background-color: rgba(245,245,245,0.8);
    word-wrap:break-word;
}
</style>
