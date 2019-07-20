<template>
  <ul class="right-tools-bar">
    <li class="tool" @click="openDialog('SelectLevelDialog')">
      <i><img src="../assets/image/new.svg" width="100%" alt=""></i>
      <div class="text">NEW</div>
    </li>
    <li class="tool res" @click="openDialog('RestartDialog')" :class="{ active: isStarted }">
      <i class="reset"><img src="../assets/image/reset.svg" width="100%" alt=""></i>
      <div class="text">RESTAET</div>
    </li>
    <li class="tool undo" @click="undo" :class="{ active: moved }">
      <i class="undo"><img src="../assets/image/undo.svg" width="100%" alt=""></i>
      <div class="text">UNDO</div>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    isStarted() {
      return this.$store.state.isStarted;
    },
    moved() {
      return this.$store.state.moveTimes > 0;
    }
  },
  methods: {
    undo() {
      if (!this.moved) return;
      this.$store.dispatch('undoAction');
    },
    openDialog(type) {
      if (type === 'RestartDialog' && !this.isStarted) return;
      if (type === 'SelectLevelDialog' && this.isStarted) {
        this.$bus.$emit('onOpenDialog', { dialogType: 'NewGameDialog' });
      } else {
        this.$bus.$emit('onOpenDialog', { dialogType: type });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
ul.right-tools-bar {
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
  padding: 120px 0;
  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 45px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      opacity: 0.5;
    }
    &.res {
      opacity: 0.5;
      &.active {
        opacity: 1;
        &:hover {
          opacity: 0.5;
        }
      }
    }
    &.undo {
      opacity: 0.5;
      &.active {
        opacity: 1;
        &:hover {
          opacity: 0.5;
        }
      }
    }
    i {
      display: inline-block;
      width: 60px;
      margin-bottom: 0.5rem;
      &.reset {
        width: 40px;
      }
      &.undo {
        width: 40px;
      }
    }
    .text {
      width: 100%;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }

  }
}
</style>
