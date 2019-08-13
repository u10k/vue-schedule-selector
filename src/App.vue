<template>
  <div id="app">
    <div class="ScheduleSelectorCard">
      <ScheduleSelector
              :minTime="minTime"
              :maxTime="maxTime"
              :numDays="numDays"
              :selection="schedule"
              :half-hour="halfHour"
              :auto-complete="autoComplete"
              :show-date="showDate"
              @onChange="handleDateChange"/>
    </div>
  </div>
</template>

<script>
import ScheduleSelector from "./components/ScheduleSelector";

export default {
  name: "schedule",
  // inheritAttrs: false,
  data() {
    return {
      minTime: 7,
      maxTime: 20,
      numDays: 7,
      schedule: [],
      halfHour: true,
      autoComplete: false,
      showDate: false,
    };
  },
  components: {
    ScheduleSelector
  },
  mounted() {},
  methods: {
    handleDateChange(newSchedule, customizeDate) {
      // 如果不赋值，则每次都是重新选择
      console.log('%ccustomizeDate', 'color:darkred;text-shadow:3px 3px 3px red;font-size:20px;', customizeDate);
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
    max-width: 800px;
    & > * {
      flex-grow: 1;
    }
  }
</style>
