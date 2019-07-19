<template>
  <div class="target_slot_panel">
    <TargetSlot v-for="(slot, index) in slots.targetSlots" :key="index" :slotData="slot" :name="slot.name"></TargetSlot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TargetSlot from '@/components/slot/TargetSlot.vue';
export default {
  computed: {
    ...mapState(['slots'])
  },
  components: {
    TargetSlot
  }
};
</script>

<style lang="scss" scoped>
.target_slot_panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 12.5px;
}
</style>
