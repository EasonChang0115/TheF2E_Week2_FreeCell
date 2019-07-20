import Vue from 'vue';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
Vue.use(Vuex);
const initState = {
  slots: {
    freeSlots: [{
        name: 'free1',
        cards: []
      }, {
        name: 'free2',
        cards: []
      }, {
        name: 'free3',
        cards: []
      }, {
        name: 'free4',
        cards: []
    }],
    targetSlots: [{
        name: 'target1',
        cards: []
      }, {
        name: 'target2',
        cards: []
      }, {
        name: 'target3',
        cards: []
      }, {
        name: 'target4',
        cards: []
    }],
    bottomPokeSlots: [{
        name: 'slot1',
        cards: []
      }, {
        name: 'slot2',
        cards: []
      }, {
        name: 'slot3',
        cards: []
      }, {
        name: 'slot4',
        cards: []
      }, {
        name: 'slot5',
        cards: []
      }, {
        name: 'slot6',
        cards: []
      }, {
        name: 'slot7',
        cards: []
      }, {
        name: 'slot8',
        cards: []
      }
    ]
  }
};
export default new Vuex.Store({
  state: {
    slots: {
      freeSlots: [{
          name: 'free1',
          cards: []
        }, {
          name: 'free2',
          cards: []
        }, {
          name: 'free3',
          cards: []
        }, {
          name: 'free4',
          cards: []
      }],
      targetSlots: [{
          name: 'target1',
          cards: []
        }, {
          name: 'target2',
          cards: []
        }, {
          name: 'target3',
          cards: []
        }, {
          name: 'target4',
          cards: []
      }],
      bottomPokeSlots: [{
          name: 'slot1',
          cards: []
        }, {
          name: 'slot2',
          cards: []
        }, {
          name: 'slot3',
          cards: []
        }, {
          name: 'slot4',
          cards: []
        }, {
          name: 'slot5',
          cards: []
        }, {
          name: 'slot7',
          cards: []
        }, {
          name: 'slot8',
          cards: []
        }
      ]
    },
    time: 0,
    moveTimes: 0
  },
  mutations: {
    updateBottomPokeSlots(state, { value, name }) {
      state.slots.bottomPokeSlots.filter(slot => slot.name === name)[0].cards = value;
    },
    updateFreePokeSlots(state, { value, name }) {
      state.slots.freeSlots.filter(slot => slot.name === name)[0].cards = value;
    },
    updateTargetPokeSlots(state, { value, name }) {
      state.slots.targetSlots.filter(slot => slot.name === name)[0].cards = value;
    },
    clearAllSlots(state) {
      let clearSlot = {
        freeSlots: [{
            name: 'free1',
            cards: []
          }, {
            name: 'free2',
            cards: []
          }, {
            name: 'free3',
            cards: []
          }, {
            name: 'free4',
            cards: []
        }],
        targetSlots: [{
            name: 'target1',
            cards: []
          }, {
            name: 'target2',
            cards: []
          }, {
            name: 'target3',
            cards: []
          }, {
            name: 'target4',
            cards: []
        }],
        bottomPokeSlots: [{
            name: 'slot1',
            cards: []
          }, {
            name: 'slot2',
            cards: []
          }, {
            name: 'slot3',
            cards: []
          }, {
            name: 'slot4',
            cards: []
          }, {
            name: 'slot5',
            cards: []
          }, {
            name: 'slot7',
            cards: []
          }, {
            name: 'slot8',
            cards: []
          }
        ]
      };
      state.slots = cloneDeep(clearSlot);
    },
    setTime(state, { value }) {
      state.time = value;
    }
  },
  actions: {
    restartCurrentGame({ state, commit }) {
      commit('clearAllSlots');
      state.slots.bottomPokeSlots = cloneDeep(initState.slots.bottomPokeSlots);
    },
    loadLevelInbottomPokeSlots({ state, commit }, { levelData }) {
      commit('clearAllSlots');
      initState.slots.bottomPokeSlots = cloneDeep(levelData);
      state.slots.bottomPokeSlots = cloneDeep(levelData);
    },
  }
});
