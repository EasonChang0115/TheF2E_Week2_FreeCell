<template>
  <div class="completed_panel">
    <h3>congratulations</h3>
    <div class="score">
      <div class="move">{{ $store.state.moveTimes }} MOVES</div>
      <div class="time">TIME:  {{ $store.state.time | timeformat }}</div>
    </div>
    <div class="button-group">
      <button class="confirmBtn" @click="reset">Start A New Game</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      reset() {
        this.$bus.$emit('onOpenDialog', { dialogType: 'SelectLevelDialog' });
        this.$bus.$emit('onResetGame');
        this.$store.commit('clearAllSlots');
        this.$store.commit('setCompletedAction', { value: false });
      }
    }
  };
</script>

<style lang="scss" scoped>
.completed_panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  h3 {
    font-size: 2.25rem;
    font-weight: bold;
    color: white;
    text-align: center;
    text-transform: uppercase;
  }
  .score {
    margin: 1rem 0 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: white;
    div {
      margin: 1rem 0;
    }
  }
}
</style>
