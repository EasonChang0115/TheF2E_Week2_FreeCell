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
import draggable from 'vuedraggable';
export default {
  props: ['slotData', 'name'],
  components: {
    PokeCard,
    draggable
  },
  mounted() {
    this.viewCardHeightPosition();
  },
  computed: {
    slotHeight() {
      if (this.slotData.cards.length === 0) return 160;
      return (this.slotData.cards.length - 1) * 35 + 160;
    },
    cardLists: {
      get () {
        return this.$store.state.slots.bottomPokeSlots.filter(slot => slot.name === this.name)[0].cards;
      },
      set(value) {
        this.$store.commit('updateBottomPokeSlots', {
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
    },
    // 當 slot 被 dragover 時，需要重新計算預設牌的高度
    viewCardHeightPosition() {
      let targetAll = document.querySelectorAll('.card_slot');
      targetAll.forEach(target => target.addEventListener('dragover', function() {
        let childNodesLength = this.childNodes.length;
        this.childNodes.forEach(child => {
          if (child.className.includes('ghost')) {
            if (childNodesLength === 1 || childNodesLength === 0) child.style.top = '0px';
            else child.style.top = (childNodesLength - 1) * 35 + 'px';
          }
        });
      }));
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
