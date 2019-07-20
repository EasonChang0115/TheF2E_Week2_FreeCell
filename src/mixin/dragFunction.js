export default {
  methods: {
    onStart() {},
    onEnd(option) {
      if (option.to.className.includes('card_slot')) {
        let childNodes = option.to.childNodes;
        childNodes.forEach((node, index) => {
          node.style.top = index * 35 + 'px';
        });
      }
    },
    onMove(option) {
      console.log('Move');
      console.log(option);
      //  都得放最後一個
      if (option.willInsertAfter === false) return false;
      // 移動的牌 Dom
      let dragged = option.dragged;
      // 移動的牌的資料
      let draggedElementData = option.draggedContext.element;
      // 目標插槽的 Dom
      let targetDom = option.to;
      // 目標插槽的資料
      let targetSlotsDataList = option.relatedContext.list;
      // 如果是排序的插槽 card_slot
      if (targetDom.className.includes('card_slot')) {
        // 就得則重新計算高度
        dragged.style.top = targetSlotsDataList.length * 35 + 'px';
        // 沒有牌 不需要驗證
        if (targetSlotsDataList.length === 0) return true;
        // 驗證顏色 黑紅交錯
        let targetSlotLastData = targetSlotsDataList[targetSlotsDataList.length - 1];
        if (targetSlotLastData.color === 'red' && draggedElementData.color === 'black' ||
            targetSlotLastData.color === 'black' && draggedElementData.color === 'red'
        ) {
          // 數字驗證 必須越來越小
          let listLastNumber = Number(targetSlotsDataList[targetSlotsDataList.length - 1].number);
          if ((listLastNumber - 1) === Number(draggedElementData.number)) return true;
        }
      }
      // 如果目標是暫存的插槽 free_slot 則只能放一個
      if (targetDom.className.includes('free_slot')) {
        if (targetSlotsDataList.length === 0) return true;
      }
      // 如果是最終插槽 target_slot 則需驗證
      if (targetDom.className.includes('target_slot')) {
        // 當最終插槽沒有東西 而且拖動的物件為 Ａ 的時候可以放
        if (Number(draggedElementData.number) === 1 && targetSlotsDataList.length === 0) return true;
        else if (targetSlotsDataList.length > 0 && Number(draggedElementData.number) !== 1) {
          // 數字驗證 必須越來越大
          let listLastNumber = Number(targetSlotsDataList[targetSlotsDataList.length - 1].number);
          if (draggedElementData.flower === targetSlotsDataList[0].flower &&
              (listLastNumber + 1) === Number(draggedElementData.number)) return true;
        }
      }
      return false;
    }
  }
};
