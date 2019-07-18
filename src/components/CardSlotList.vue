<template>
  <div class="poke_card_slot_panel">
    <CardSlot v-for="(slot, key, index) in bottomPokeSlots" :key="index" :slotData="slot" :name="key"></CardSlot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardSlot from '@/components/CardSlot.vue';
export default {
  components: {
    CardSlot
  },
  computed: {
    ...mapState(['bottomPokeSlots'])
  },
  methods: {
    slotHeight(slot) {
      if (slot.cards.length === 0) return 160;
      return (slot.cards.length - 1) * 35 + 160;
    }
  }
};
</script>

<style lang="scss" scoped>
.poke_card_slot_panel {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 3.25rem;
}
</style>
