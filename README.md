# vue-schedule-selector
<a href="https://www.npmjs.com/package/vue-schedule-selector" target="_blank" rel="external"><img src="https://img.shields.io/npm/v/vue-schedule-selector.svg" style="width: auto; height: auto"></a><a href="https://www.npmjs.com/package/vue-schedule-selector"><img src="https://img.shields.io/npm/dm/vue-schedule-selector.svg" style="width: auto; height: auto"></a>

### vue-schedule-selector

一个友好的 [when2meet](https://www.when2meet.com/) 风格的网格时间选择器，使用date-fns构建。


[Live example](https://codesandbox.io/s/vue-schedule-selector-t6bhe)

<img src='http://ww3.sinaimg.cn/large/006tNc79gy1g5w82vxhxvj30ui0u0768.jpg'>


## Install
```
npm install vue-schedule-selector
```

## Usage
```html
<ScheduleSelector
              :minTime="minTime"
              :maxTime="maxTime"
              :numDays="numDays"
              :selection="schedule"
              :half-hour="halfHour"
              :auto-complete="autoComplete"
              :show-date="showDate"
              @onChange="handleDateChange"/>
```

```javascript
import ScheduleSelector from "./components/ScheduleSelector";

export default {
  name: "schedule",
  // inheritAttrs: false,
  data() {
    return {
      minTime: 7, // 最小时间 0
      maxTime: 20, // 最大时间 23
      numDays: 7, // 显示天数
      schedule: [], // 时间
      halfHour: true, // 是否显示半小时
      autoComplete: false, // 是否开启自动补全
      showDate: false, // 是否显示星期
    };
  },
  components: {
    ScheduleSelector
  },
  mounted() {},
  methods: {
    handleDateChange(newSchedule, customizeDate) {
      // 自定义日期只显示最小时间和最大时间，不需要可以不接受第二参数 
      console.log(customizeDate);
      // 如果不赋值，则每次都是重新选择
      this.schedule = newSchedule;
    },
  }
};
```

