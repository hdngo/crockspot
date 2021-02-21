<template>
  <div id="app">
      Test
      <TestComponent />
  </div>
</template>

<script>
import TestComponent from '../components/Test.vue';

export default {
  name: 'App',
  components: {
      TestComponent
  }
};
</script>

<style lang="scss">
@use '../scss/base';
html {
    // color: teal;
}
</style>