<template>
  <div class="dialog">
    <div class="dialog-background" @click="closed"></div>
    <component :is="type"></component>
  </div>
</template>

<script>
import SelectLevelDialog from './SelectLevelDialog.vue';
import RestartDialog from './RestartDialog.vue';
import NewGameDialog from './NewGameDialog.vue';

export default {
  props: ['type'],
  components: {
    SelectLevelDialog,
    RestartDialog,
    NewGameDialog
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
