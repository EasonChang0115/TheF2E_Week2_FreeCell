<template>
  <div class="free_slot_panel">
    <FreeSlot v-for="(slot, index) in slots.freeSlots" :key="index" :slotData="slot" :name="slot.name"></FreeSlot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FreeSlot from '@/components/slot/FreeSlot.vue';
export default {
  computed: {
    ...mapState(['slots'])
  },
  components: {
    FreeSlot
  }
};
</script>

<style lang="scss" scoped>
.free_slot_panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-right: 12.5px;
}
</style>
