<template>
  <div class="dialog-box">
    <div class="alert-logo">
      <img src="../../assets/image/alert.svg" alt="alert">
    </div>
    <h3>Do you want to restart the current game?<br>This will undo all your moves.</h3>
    <div class="button-group">
      <button class="confirmBtn" @click="reStartCurrent">Restart The Current Game</button>
      <button class="cancelBtn" @click="$bus.$emit('closeDialog')">Back To The Current Game</button>
    </div>
  </div>
</template>

<script>
import LevelList from '@/data/Level.json';
export default {
  data() {
    return {
      LevelList: LevelList.LevelList,
      selectedLevel: null
    };
  },
  methods: {
    reStartCurrent() {
      this.$store.dispatch('restartCurrentGame');
      this.$bus.$emit('closeDialog');
      this.$bus.$emit('onStartGame');
    }
  }
};
</script>
