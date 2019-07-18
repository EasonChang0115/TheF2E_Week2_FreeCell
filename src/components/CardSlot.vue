<template>
  <draggable element="div" class="card_slot" 
      v-bind="getOptions()"
      :style="{ height: slotHeight + 'px' }"
      v-model="cardLists"
  >
    <PokeCard v-for="(card, cindex) in slotData.cards" :key="card.id" :cardData="card" :top="cindex * 35"/>
  </draggable>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import draggable from 'vuedraggable'
export default {
  props: ['slotData', 'name'],
  components: {
    PokeCard,
    draggable
  },
  computed: {
    slotHeight() {
      if (this.slotData.cards.length === 0) return 160;
      return (this.slotData.cards.length - 1) * 35 + 160;
    },
    cardLists: {
      get () {
        return this.$store.state.bottomPokeSlots[this.name].cards
      },
      set(value) {
        this.$store.commit('updateBottomPokeSlots', {
          value,
          key: this.name,
        })
      }
    }
  },
  methods: {
    getOptions() {
      return {
        animation: 150,
        group: "description",
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style lang="scss">
.card_slot {
  width: 110px;
  border: 1px dotted rgba(white, 0.2);
  border-radius: 5px;
}
</style>
