<template>
  <div class="dialog-box">
    <div class="alert-logo">
      <img src="../../assets/image/alert.svg" alt="alert">
    </div>
    <h3>Please select the level you want.</h3>
    <div class="select-panel">
      <ul class="level-lists">
        <li
          class="level"
          v-for="(level, key ,index) in LevelList" :key="index"
          :class="selectedLevel === key ? 'selected' : ''"
          @click="selectedLevel = key"
        >
          <img :src="level.image" :alt="key">
          <h4>{{ level.name }}</h4>
        </li>
      </ul>
    </div>
    <div class="button-group">
      <button class="confirmBtn" @click="onSelectedLevel">Selected This Level</button>
      <button class="cancelBtn" @click="$bus.$emit('closeDialog')">Back</button>
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
    onSelectedLevel() {
      if (this.selectedLevel === null) return;
      if (this.selectedLevel === 'LevelThree') {
        this.$store.dispatch('loadRandomLevelInbottomPokeSlots');
        this.$bus.$emit('closeDialog');
        this.$bus.$emit('onStartGame');
      } else {
        this.$store.dispatch('loadLevelInbottomPokeSlots', { levelData: this.LevelList[this.selectedLevel].slots });
        this.$bus.$emit('closeDialog');
        this.$bus.$emit('onStartGame');
      }
    }
  }
};
</script>
