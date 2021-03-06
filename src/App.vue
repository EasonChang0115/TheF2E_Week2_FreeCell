<template>
  <div id="app">
    <div class="main">
      <transition name="fadeOut"><LoadingPage v-if="showLoading"/></transition>
      <Header />
      <div class="top_slot">
        <FreeSlotList />
        <TargetSlotList />
      </div>
      <div class="bottom_slot">
        <transition name="zoom">
          <CardSlotList v-if="!$store.state.isCompleted"/>
          <CompeletedPanel v-else/>
        </transition>
      </div>
    </div>
    <div class="slide" :class="{open: !showLoading}"><RightToolsBar /></div>
    <transition name="fade">
      <Dialog v-if="dialogOpen && dialogType.length !== 0" :type="dialogType"></Dialog>
    </transition>
  </div>
</template>
<script>
import LoadingPage from '@/components/LoadingPage.vue';
import RightToolsBar from '@/components/RightToolsBar.vue';
import Header from '@/components/Header.vue';
import FreeSlotList from '@/components/slot/FreeSlotList.vue';
import TargetSlotList from '@/components/slot/TargetSlotList.vue';
import CardSlotList from '@/components/slot/CardSlotList.vue';
import Dialog from '@/components/Dialogs/Dialog.vue';
import CompeletedPanel from '@/components/CompeletedPanel.vue';
import { setInterval, clearInterval, setTimeout, clearTimeout } from 'timers';

export default {
  mounted() {
    setTimeout(() => {
      this.showLoading = false;
    });
  },
  components: {
    Header,
    LoadingPage,
    RightToolsBar,
    FreeSlotList,
    TargetSlotList,
    CardSlotList,
    Dialog,
    CompeletedPanel
  },
  data() {
    return {
      dialogOpen: true,
      dialogType: '',
      showLoading: true,
      timer: null,
      countDown: 1.5
    };
  },
  created() {
    this.$bus.$on('onOpenDialog', ({ dialogType }) => {
      this.dialogOpen = true;
      this.dialogType = dialogType;
    });
    this.$bus.$on('closeDialog', () => {
      this.dialogOpen = false;
    });
    this.$bus.$on('onStartGame', () => {
      this.resetGame();
      let countTime = setTimeout(() => {
        this.$store.commit('toggleStart', { value: true });
        this.timer = setInterval(() => {
          this.$store.commit('setTime', { value: this.$store.state.time + 1 });
        }, 1000);
        clearTimeout(countTime);
      }, this.countDown * 1000);
    });
    this.$bus.$on('onCompletedGame', () => {
      clearInterval(this.timer);
      this.$store.commit('setCompletedAction', { value: true });
    });
    this.$bus.$on('onResetGame', () => {
      this.resetGame();
    });
  },
  destroyed() {
    this.$bus.$off('onOpenDialog');
    this.$bus.$off('closeDialog');
    this.$bus.$off('onStartGame');
    this.$bus.$off('onCompletedGame');
    this.$bus.$off('onResetGame');
  },
  methods: {
    resetGame() {
      clearInterval(this.timer);
      this.$store.commit('setTime', { value: 0 });
      this.$store.commit('toggleStart', { value: false });
      this.$store.commit('setCompletedAction', { value: false });
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  min-width: 1280px;
  height: 100%;
  background: rgb(82,82,82);
  background: linear-gradient(180deg, rgba(82,82,82,1) 0%, rgba(0,31,29,1) 100%);
  display: flex;
  overflow: hidden;
  padding-right: 105px;
  .main {
    width: calc(100% - 105px);
    max-width: 1160px;
    margin: 0 auto;
    height: 100%;
    padding: 0 2.5rem;
  }
  .slide {
    z-index: 2;
    background-color: #001F1D;
    width: 105px;
    height: 100%;
    position: absolute;
    right: -105px;
    top: 0;
    transition: 1s;
    transition-delay: 1.5s;
    &.open {
      right: 0;
    }
  }
  .top_slot {
    margin-top: 1rem;
    width: 100%;
    display: flex;
  }
}
</style>
