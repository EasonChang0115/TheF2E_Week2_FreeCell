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
          cards: [{
            id: 'spade_5',
            number: '5',
            color: 'black',
            flower: 'spade'
          }]
        }, {
          name: 'free2',
          cards: [{
            id: 'spade_2',
            number: '2',
            color: 'black',
            flower: 'spade'
          }]
        }, {
          name: 'free3',
          cards: []
        }, {
          name: 'free4',
          cards: []
      }],
      targetSlots: [{
          name: 'target1',
          cards: [{
            id: 'spade_1',
            number: '1',
            color: 'black',
            flower: 'spade'
          }]
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
          cards: [{
            id: 'spade_4',
            number: '4',
            color: 'black',
            flower: 'spade'
          }]
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
          cards: [{
            id: 'spade_3',
            number: '3',
            color: 'black',
            flower: 'spade'
          }]
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
    loadLevelInbottomPokeSlots(state, { levelData }) {
      state.slots = cloneDeep(initState.slots);
      state.slots.bottomPokeSlots = cloneDeep(levelData);
    }
  },
  actions: {

  }
});
