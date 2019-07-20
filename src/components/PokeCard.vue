<template>
  <draggable element="div" 
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
      v-for="card in realValue"
      :key="card.id"
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
export default {
  name: "PokeCard",
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
      this.$emit("input", value);
    },
    getOptions() {
      return {
        animation: 150,
        group: 'cardSlot',
        ghostClass: 'ghost',
        sort: false
      };
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
