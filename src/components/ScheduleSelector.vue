<template>
  <div>
    <div class="Wrapper">
      <div class="Grid">
        <div class="Column">
          <div class="DateLabel"></div>
          <div class="TimeLabelCell" v-for="t in maxTime">
            <div class="TimeText">{{ formatHour(t) }}</div>
          </div>
        </div>
        <div v-for="dayOfTimes in this.dates">
          <div class="Column">
            <div class="GridCell">
              <div class="DateLabel">{{ formatDate(dayOfTimes, "M/D") }}</div>
            </div>
          </div>
          <div class="GridCell" v-for="time in dayOfTimes">
            <div
              @mousedown="startHandler(time)"
              @mouseenter="handleMouseEnterEvent(time)"
              @mouseup="handleMouseUpEvent(time)">
              <div
                :class="
                  selected(time)
                    ? 'selectedColor DateCell'
                    : 'unselectedColor DateCell'
                "
                :selected="selected(time)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import only the methods we need from date-fns in order to keep build size small
import addHours from "date-fns/add_hours";
import addDays from "date-fns/add_days";
import startOfDay from "date-fns/start_of_day";
import isSameMinute from "date-fns/is_same_minute";
import formatDate from "date-fns/format";
import selectionSchemes from "./selection-schemes";

// endSelection = endSelection.bind(this)
const selectionSchemeHandlers = {
  linear: selectionSchemes.linear,
  square: selectionSchemes.square
};
export default {
  name: "ScheduleSelector",
  data() {
    return {
      dates: [],
      startDate: new Date(),
      selectionDraft: [...this.selection],
      selectionType: null,
      selectionStart: null,
      selectionScheme: "square"
    };
  },
  props: {
    minTime: {
      type: Number,
      default: 1
    },
    maxTime: {
      type: Number,
      default: 24
    },
    numDays: {
      type: Number,
      default: 7
    },
    selection: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  created() {
    // this.selectionSchemeHandlers = {
    //     linear: selectionSchemes.linear,
    //     square: selectionSchemes.square
    // }
    const startTime = startOfDay(this.startDate);
    this.cellToDate = new Map();
    for (let d = 0; d < this.numDays; d += 1) {
      const currentDay = [];
      for (let h = this.minTime; h <= this.maxTime; h += 1) {
        currentDay.push(addHours(addDays(startTime, d), h));
      }
      this.dates.push(currentDay);
    }
  },
  mounted() {
    document.addEventListener("mouseup", this.endSelection);
  },
  methods: {
    formatHour(hour) {
      const h = hour === 0 || hour === 12 || hour === 24 ? 12 : hour % 12;
      const abb = hour < 12 || hour === 24 ? "上午" : "下午";
      // return `${abb}${h}`
      return `${hour === 24 ? "00" : hour}:00`;
    },
    formatDate(dayOfTimes, dateFormat) {
      return formatDate(dayOfTimes[0], dateFormat);
    },
    endSelection() {
      this.$emit("onChange", this.selectionDraft);
      this.selectionType = null;
      this.selectionStart = null;
    },
    preventScroll(e) {
      e.preventDefault();
    },
    selected(time) {
      return Boolean(this.selectionDraft.find(a => isSameMinute(a, time)));
    },
    startHandler(time) {
      this.handleSelectionStartEvent(time);
    },
    handleSelectionStartEvent(startTime) {
      //检查是否选中/取消选择startTime单元格以确定是否应该执行此拖动选择
      //添加值或删除值
      const timeSelected = this.selection.find(a => isSameMinute(a, startTime));
      this.selectionType = timeSelected ? "remove" : "add";
      this.selectionStart = startTime;
    },
    handleMouseEnterEvent(time) {
      //还需要更新mouseup上的选择草稿以便捕获案例
      //用户只需单击一个单元格（因为没有鼠标中心事件触发）
      //在这种情况下）
      this.updateAvailabilityDraft(time);
    },
    handleMouseUpEvent(time) {
      this.updateAvailabilityDraft(time);
      // 不要在这里调用this.endSelection（）因为文档mouseup处理程序会这样做
    },
    // 给定结束日期，确定应在此草稿中选择的所有日期
    updateAvailabilityDraft(selectionEnd, callback) {
      const selectionType = this.selectionType;
      const selectionStart = this.selectionStart;

      if (selectionType === null || selectionStart === null) return;

      let newSelection = [];
      if (selectionStart && selectionEnd && selectionType) {
        newSelection = selectionSchemeHandlers[this.selectionScheme](
          selectionStart,
          selectionEnd,
          this.dates
        );
      }

      let nextDraft = [...this.selection];
      if (selectionType === "add") {
        nextDraft = Array.from(new Set([...nextDraft, ...newSelection]));
      } else if (selectionType === "remove") {
        nextDraft = nextDraft.filter(
          a => !newSelection.find(b => isSameMinute(a, b))
        );
      }

      // this.setState({ selectionDraft: nextDraft }, callback)
      this.selectionDraft = nextDraft;
    }
  }
};
</script>

<style scoped>
.Wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  user-select: none;
}
.Grid {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
}
.Column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
}
.GridCell {
  margin: 6px 3px;
  height: 25px;
  width: 95px;
  touch-action: none;
}
.DateCell {
  width: 100%;
  height: 25px;
  background-color: rgb(242, 83, 138);
  /*&:hover {*/
  /*    background-color: rgba(162, 198, 248, 1);*/
  /*}*/
}
.DateCell:hover {
  background-color: rgba(162, 198, 248, 1);
}
.selectedColor {
  background: rgba(89, 154, 242, 1);
}
.unselectedColor {
  background: rgba(255, 255, 255, 1);
}
.DateLabel {
  height: 37px;
  text-align: center;
  @media (max-width: 699px) {
    font-size: 12px;
  }
}
.TimeLabelCell {
  position: relative;
  display: block;
  width: 100%;
  height: 25px;
  margin: 3px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.TimeText {
  margin: 0;
  @media (max-width: 699px) {
    font-size: 10px;
  }
  text-align: right;
}
</style>
