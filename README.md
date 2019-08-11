# vue-schedule-selector
<a href="https://www.npmjs.com/package/vue-schedule-selector" target="_blank" rel="external"><img src="https://img.shields.io/npm/v/vue-schedule-selector.svg" style="width: auto; height: auto"></a><a href="https://www.npmjs.com/package/vue-schedule-selector"><img src="https://img.shields.io/npm/dm/vue-schedule-selector.svg" style="width: auto; height: auto"></a>

## Project setup
```
npm install vue-schedule-selector
```

### vue-schedule-selector
一款高级时间选择器（vue）

<img src='http://ww2.sinaimg.cn/large/006tNc79gy1g5nxi5uwlgj30u00v7tab.jpg'>

```html
<ScheduleSelector
              :minTime='minTime'
              :maxTime='maxTime'
              :numDays='numDays'
              :selection='schedule'
              @onChange='handleDateChange'/>
```

```javascript
import ScheduleSelector from "vue-schedule-selector";
export default {
  name: "schedule",
  data() {
    return {
      minTime: 1,
      maxTime: 24,
      numDays: 7,
      schedule: []
    };
  },
  components: {
    ScheduleSelector,
  },
  methods: {
    handleDateChange(newSchedule) {
      this.schedule = newSchedule;
    }
  }
};
```

