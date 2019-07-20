<template>
  <draggable element="div" class="target_slot"
      v-bind="getOptions()"
      v-model="cardLists"
      @start="onStart"
      @end="onEnd"
      :move="onMove"
  >
    <PokeCard v-for="card in slotData.cards" :key="card.id" :cardData="card" />
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
    cardLists: {
      get () {
        return this.$store.state.slots.targetSlots.filter(slot => slot.name === this.name)[0].cards;
      },
      set(value) {
        this.$store.commit('updateTargetPokeSlots', {
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
.target_slot {
  width: 110px;
  height: 160px;
  border: 1px solid white;
  border-radius: 5px;
  &::before {
    position: absolute;
    content: 'A';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 75px;
    font-weight: bold;
    color: rgba(white, 0.5);
  }
}
</style>
