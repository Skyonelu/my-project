<template>
  <div id="app">
    <h1>Welcome to My Vue App!</h1>
    <MapComponent /> <!-- 显示中国地图的组件 -->
  </div>
</template>

<script>
import MapComponent from './MapComponent.vue'

export default {
  components: {
    MapComponent
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
</style>
