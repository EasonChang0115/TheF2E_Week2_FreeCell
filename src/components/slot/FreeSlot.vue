<template>
  <draggable element="div" class="free_slot"
      v-bind="getOptions()"
      v-model="cardLists"
      @start="onStart"
      @end="onEnd"
      :move="onMove"
  >
    <PokeCard v-for="card in slotData.cards" :key="card.id" :cardData="card" :position="'free'" :className="className"/>
  </draggable>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import draggable from 'vuedraggable';
import draggleFunction from '@/mixin/dragFunction.js';
export default {
  props: ['slotData', 'name'],
  mixins: [draggleFunction],
  components: {
    PokeCard,
    draggable
  },
  computed: {
    className() {
      if (this.$store.state.time > 0) return 'poke_card started';
      else return 'poke_card';
    },
    cardLists: {
      get () {
        return this.$store.state.slots.freeSlots.filter(slot => slot.name === this.name)[0].cards;
      },
      set(value) {
        this.$store.commit('updateFreePokeSlots', {
          value,
          name: this.name
        });
      }
    }
  },
  methods: {
    // draggable 套件的 option 設定
    getOptions() {
      return {
        animation: 150,
        group: 'cardSlot',
        ghostClass: 'ghost',
        sort: false
      };
    }
  }
};
</script>

<style lang="scss">
.free_slot {
  width: 110px;
  height: 160px;
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  background-color: transparent;
  &::before {
    display: inline-block;
    content: '';
    width: 100px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    border-radius: 5px;
  }
}
</style>
