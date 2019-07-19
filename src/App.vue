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
        <CardSlotList />
      </div>
    </div>
    <div class="slide" :class="{open: !showLoading}"><RightToolsBar /></div>
  </div>
</template>
<script>
import LoadingPage from '@/components/LoadingPage.vue';
import RightToolsBar from '@/components/RightToolsBar.vue';
import Header from '@/components/Header.vue';
import FreeSlotList from '@/components/slot/FreeSlotList.vue';
import TargetSlotList from '@/components/slot/TargetSlotList.vue';
import CardSlotList from '@/components/slot/CardSlotList.vue';

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
    CardSlotList
  },
  data() {
    return {
      showLoading: true,
      pokeCards: [
        {
          id: 0,
          number: 1,
          color: 'pitch'
        }
      ]
    };
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
