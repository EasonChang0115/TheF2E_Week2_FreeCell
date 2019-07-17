<template>
  <div id="app">
    <Header />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },
  data() {
    return {
      pokeCards: [
        {
          id: 0,
          number: 1,
          color: 'pitch'
        }
      ]
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
}
</style>
