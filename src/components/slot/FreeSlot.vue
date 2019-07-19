<template>
  <draggable element="div" class="free-slot"
      v-bind="getOptions()"
      v-model="cardLists"
  >
    <PokeCard v-for="card in slotData.cards" :key="card.id" :cardData="card" />
  </draggable>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import draggable from 'vuedraggable';
export default {
  props: ['slotData', 'name'],
  components: {
    PokeCard,
    draggable
  },
  computed: {
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
        group: 'description',
        ghostClass: 'ghost'
      };
    }
  }
};
</script>

<style lang="scss">
.free-slot {
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
