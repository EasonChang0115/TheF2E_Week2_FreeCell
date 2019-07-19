<template>
  <div class="dialog">
    <div class="dialog-background" @click="closed"></div>
    <component :is="type"></component>
  </div>
</template>

<script>
import SelectLevelDialog from './SelectLevelDialog.vue';
export default {
  props: ['type'],
  components: {
    SelectLevelDialog
  },
  methods: {
    closed() {
      this.$bus.$emit('closeDialog');
    }
  }
};
</script>

<style lang="scss">
@import '../../scss/component/dialog.scss';
</style>
