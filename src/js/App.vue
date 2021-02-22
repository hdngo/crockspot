<template>
  <div id="app">
      <MainSearchBar />
      <router-view></router-view>
  </div>
</template>

<script>
import MainSearchBar from '../components/MainSearchBar.vue';

export default {
  name: 'App',
  components: {
      MainSearchBar
  }
};
</script>

<style lang="scss">
@use 'node_modules/modern-normalize/modern-normalize.css';
@use '../scss/base';

html,
body {
    height: 100%;
    width: 100%
}

#app {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>