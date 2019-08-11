<template>
  <div id="app">
    <div class="ScheduleSelectorCard">
      <ScheduleSelector
              :minTime="minTime"
              :maxTime="maxTime"
              :numDays="numDays"
              :selection="schedule"
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
      minTime: 1,
      maxTime: 24,
      numDays: 7,
      schedule: []
    };
  },
  components: {
    ScheduleSelector
  },
  mounted() {},
  methods: {
    handleDateChange(newSchedule) {
      console.log(newSchedule);
      this.schedule = newSchedule;
    }
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
