<template>
  <div class="dialog-box">
    <div class="alert-logo">
      <img src="../../assets/image/alert.svg" alt="alert">
    </div>
    <h3>You have a game in progress.</h3>
    <div class="button-group">
      <button class="confirmBtn" @click="reStartCurrent">Start A New Game</button>
      <button class="cancelBtn" @click="$bus.$emit('closeDialog')">Back To The Current Game</button>
    </div>
  </div>
</template>

<script>
import LevelList from '@/data/Level.json';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      LevelList: LevelList.LevelList,
      selectedLevel: null
    };
  },
  methods: {
    reStartCurrent() {
      this.$bus.$emit('closeDialog');
      setTimeout(() => {
        this.$bus.$emit('onOpenDialog', { dialogType: 'SelectLevelDialog' });
      });
    }
  }
};
</script>
