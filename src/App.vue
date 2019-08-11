<template>
  <div id="app">
    <div class="ScheduleSelectorCard">
      <ScheduleSelector
              :minTime="minTime"
              :maxTime="maxTime"
              :numDays="numDays"
              :selection="schedule"
              :autoComplete="autoComplete"
              @onChange="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
import ScheduleSelector from "./components/ScheduleSelector";
// import ScheduleSelector from "./components/index.js";

export default {
  name: "schedule",
  // inheritAttrs: false,
  data() {
    return {
      minTime: 0,
      maxTime: 23,
      numDays: 7,
      schedule: [],
      autoComplete: false,
    };
  },
  components: {
    ScheduleSelector
  },
  mounted() {},
  methods: {
    handleDateChange(newSchedule) {
      console.log('%c您选择是的时间是', 'color:darkred;text-shadow:3px 3px 3px red;font-size:20px;', newSchedule);
      // 如果不赋值，则每次都是重新选择
      this.schedule = newSchedule;

    },
  }
};
</script>

<style scoped>
  .ScheduleSelectorCard {
    margin-bottom: 20px;
    border-radius: 25px;
    box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.15);
    background: rgba(0, 0, 0, 0.03);
    padding: 20px;
    width: 90%;
    min-width: 800px;
    & > * {
      flex-grow: 1;
  }
  }
</style>
