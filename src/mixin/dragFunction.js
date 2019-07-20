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
      // 移動的目標
      let dragged = option.dragged;
      // 如果是排序的插槽 card_slot 就得則重新計算高度
      if (option.to.className.includes('card_slot')) {
        let targetSlotListNum = option.relatedContext.list.length;
        dragged.style.top = targetSlotListNum * 35 + 'px';
      }
      // 如果目標是暫存的插槽 free_slot 則只能放一個
      if (option.to.className.includes('free_slot')) {
        let targetSlotListNum = option.relatedContext.list.length;
        if (targetSlotListNum >= 1) return false;
      }
      // 如果是最終插槽 target_slot 則需驗證
      if (option.to.className.includes('target_slot')) {
        let draggedElementData = option.draggedContext.element;
        let targetSlotsDataList = option.relatedContext.list;
        // 當最終插槽沒有東西 而且拖動的物件為 Ａ 的時候可以放
        if (Number(draggedElementData.number) === 1 && targetSlotsDataList.length === 0) return true;
        else if (targetSlotsDataList.length > 0 && Number(draggedElementData.number) !== 1) {
          let listLastNumber = Number(targetSlotsDataList[targetSlotsDataList.length - 1].number);
          if (draggedElementData.flower === targetSlotsDataList[0].flower &&
              (listLastNumber + 1) === Number(draggedElementData.number)) return true;
        }
        return false;
      }
    }
  }
};
