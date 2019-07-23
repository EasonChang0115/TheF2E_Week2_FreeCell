import Vue from 'vue';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
Vue.use(Vuex);
function createCard(number, flower) {
  return {
    id: `${flower}_${number}`,
    number: number,
    color: flower === 'heart' ? 'red' : flower === 'diamond' ? 'red' : 'black',
    flower: flower,
    fixed: true,
    childElement: []
  };
}
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
    },
    isStarted: false,
    isCompleted: false,
    time: 0,
    moveTimes: 0,
    undoState: []
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
      };
      state.slots = cloneDeep(clearSlot);
      state.undoState.length = 0;
      state.moveTimes = 0;
    },
    setTime(state, { value }) {
      state.time = value;
    },
    toggleStart(state, { value }) {
      state.isStarted = value;
    },
    addUndoState (state) {
      state.undoState.push(JSON.stringify(state.slots));
    },
    undoCommit (state) {
      if (state.undoState.length > 1) {
        let lastSlotsState = JSON.parse(state.undoState[state.undoState.length - 2]);
        state.undoState.pop();
        state.slots = lastSlotsState;
      }
    },
    addMoveTimes (state) {
      state.moveTimes += 1;
    },
    setCompletedAction(state, { value }) {
      state.isCompleted = value;
    },
    shuffleCards(state) {
      // 先產生所有牌的資料
      let allCards = [];
      let flowerMap = ['spade', 'heart', 'diamond', 'club'];
      for (let i = 0; i < 52; i += 1) {
        let flower = Math.floor(i / 13);
        let number = i % 13 + 1;
        allCards.push(createCard(number, flowerMap[flower]));
      }
      // 放入目標
      for (let i = 0; i < 8; i += 1) {
        let cardNumbers = i >= 4 ? 6 : 7;
        for (let j = 0; j < cardNumbers; j += 1) {
          // 從目前長度取隨機取得要抽的牌
          let targetCardIndex = Math.floor(Math.random() * allCards.length);
          state.slots.bottomPokeSlots[i].cards.push(allCards[targetCardIndex]);
          allCards.splice(targetCardIndex, 1);
        }
      }
      // 修改最最後一張牌的 fixed
      state.slots.bottomPokeSlots.forEach(slots => {
        slots.cards.forEach((card, index, array) => {
          if (index === (array.length - 1)) {
            card.fixed = false;
          }
        });
      });
    }
  },
  actions: {
    undoAction ({ state, commit }) {
      if (state.undoState.length > 1) {
        commit('undoCommit');
        commit('addMoveTimes');
      }
    },
    restartCurrentGame({ state, commit }) {
      commit('clearAllSlots');
      state.slots.bottomPokeSlots = cloneDeep(initState.slots.bottomPokeSlots);
      state.undoState.push(JSON.stringify(state.slots));
    },
    loadLevelInbottomPokeSlots({ state, commit }, { levelData }) {
      commit('clearAllSlots');
      initState.slots.bottomPokeSlots = cloneDeep(levelData);
      state.slots.bottomPokeSlots = cloneDeep(levelData);
      state.undoState.push(JSON.stringify(state.slots));
    },
    loadRandomLevelInbottomPokeSlots({ state, commit }) {
      commit('clearAllSlots');
      commit('shuffleCards');
      initState.slots.bottomPokeSlots = cloneDeep(state.slots.bottomPokeSlots);
      state.undoState.push(JSON.stringify(state.slots));
    }
  }
});
