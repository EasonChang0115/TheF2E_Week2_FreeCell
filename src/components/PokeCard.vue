<template>
  <draggable element="div"
    :id="cardData.id"
    :class="className"
    :data-number="cardData.number"
    :data-color="cardData.color"
    :data-flower="cardData.flower"
    :data-position="position"
    :data-fixed="cardData.fixed"
    :style="{
      backgroundImage: `url('${ imgUrl }')`,
      top: isStarted ? mytop + 'px' : '0px',
    }"
    v-bind="getOptions()"
    :list="cardData.childElement"
    :value="value"
    @input="emitter"
    @start="onStart"
    @end="onEnd"
    :move="onMove"
  >
    <PokeCard
      v-for="(card, index) in realValue"
      :key="index + position"
      :className="'poke_card sub_card'"
      :cardData="card"
      :isSub="true"
      :position="position"
    >
    </PokeCard>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import draggleFunction from '@/mixin/dragFunction.js';
function addTargetCardElement(parentCard, card) {
  if (parentCard.childElement.length > 0) {
    let length = parentCard.childElement.length;
    addTargetCardElement(parentCard.childElement[length - 1], card);
  } else {
    if ((Number(parentCard.number) + 1) === Number(card.number) &&
    parentCard.flower === card.flower) {
      card.fixed = false;
      parentCard.childElement.push(card);
    }
  }
}

function removeCardElement(parentCards, card) {
  if (parentCards.childElement.length > 0) {
    let length = parentCards.childElement.length;
    if (parentCards.childElement[length - 1].id === card.id) {
      parentCards.childElement.length = 0;
    } else {
      removeCardElement(parentCards.childElement[length - 1], card);
    }
  }
}

function getLastCard(parentCards) {
  if (parentCards.childElement.length === 0) return parentCards;
  else return getLastCard(parentCards.childElement[0]);
}
export default {
  name: 'PokeCard',
  props: {
    position: {
      required: false
    },
    className: {
      required: false,
      default: 'poke_card'
    },
    top: {
      required: false
    },
    cardData: {
      required: false,
      type: Object,
      default: null
    },
    value: {
      required: false,
      type: Array,
      default: null
    },
    isSub: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  mixins: [draggleFunction],
  components: {
    draggable
  },
  methods: {
    emitter(value) {
      this.$emit('input', value);
    },
    getOptions() {
      return {
        animation: 150,
        group: 'cardSlot',
        ghostClass: 'ghost',
        sort: false
      };
    },
    pushCardInTargetSlot() {
      let isPushSuccess = false;
      let targetSlots = this.$store.state.slots.targetSlots;
      if (Number(this.cardData.number === 1)) {
        for (let i = 0; i < 4; i++) {
          if (targetSlots[i].cards.length === 0) {
            targetSlots[i].cards.push(this.cardData);
            isPushSuccess = true;
            break;
          }
        }
      } else {
        targetSlots.forEach(slot => {
          if (slot.cards.length > 0) {
            if (slot.cards[0].flower === this.cardData.flower) {
              isPushSuccess = addTargetCardElement(slot.cards[0], this.cardData);
            }
          }
        });
      }
      return isPushSuccess;
    },
    removeCardFromFreeSlot() {
      this.$store.state.slots.freeSlots.forEach((slot) => {
        let cardsLength = slot.cards.length;
        if (cardsLength > 0) {
          if (slot.cards[cardsLength - 1].childElement.length === 0) {
            if (slot.cards[cardsLength - 1].id === this.cardData.id) slot.cards.pop();
          } else {
            removeCardElement(slot.cards[cardsLength - 1], this.cardData);
          }
        }
      });
    },
    removeCardFromBottomSlot() {
      this.$store.state.slots.bottomPokeSlots.forEach((slot) => {
        let cardsLength = slot.cards.length;
        // 只看最後一張卡
        if (cardsLength > 0) {
          // 最後一張卡沒有 child 就可以移動
          if (slot.cards[cardsLength - 1].childElement.length === 0) {
            if (slot.cards[cardsLength - 1].id === this.cardData.id) {
              slot.cards.pop();
            }
          // 最後一張卡有 child
          } else {
            removeCardElement(slot.cards[cardsLength - 1], this.cardData);
          }
        }
      });
    },
    checkdbClickToMoveTarget() {
      if (Number(this.cardData.number) === 1) return true;
      let canMove = false;
      this.$store.state.slots.targetSlots.forEach((slot) => {
        if (slot.cards.length !== 0) {
          let lastCardInTargetSlot = getLastCard(slot.cards[0]);
          if (lastCardInTargetSlot.flower === this.cardData.flower &&
          Number(this.cardData.number) === (Number(lastCardInTargetSlot.number) + 1)) {
            canMove = true;
          }
        }
      });
      return canMove;
    }
  },
  computed: {
    mytop() {
      if (this.position === 'target') return 0;
      else if (this.isSub === false) return this.top;
      else return 35;
    },
    imgUrl() {
      return require('../assets/image/pokes/' + this.cardData.id + '.svg');
    },
    realValue() {
      return this.value ? this.value : this.cardData.childElement;
    },
    isStarted() {
      return this.$store.state.isStarted;
    }
  },
  mounted() {
    document.getElementById(this.cardData.id).addEventListener('dblclick', (e) => {
      console.log(this.cardData);
      if (this.cardData.fixed === true) return;
      if (this.cardData.childElement.length > 0) return;
      if (this.position === 'target') return;
      if ((this.position === 'free' || this.position === 'bottom') && this.checkdbClickToMoveTarget()) {
        this.pushCardInTargetSlot();
        if (this.position === 'free') this.removeCardFromFreeSlot();
        if (this.position === 'bottom') this.removeCardFromBottomSlot();
        this.checkAllPokeIsFixed();
        this.checkMoveTimeAndPushUndoState();
        this.checkCompleted();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.poke_card {
  width: 110px;
  height: 160px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: 1.5s;
  &.started {
    transition: .3s;
  }
  cursor: pointer;
  &.ghost {
    opacity: 0;
  }
}
</style>
