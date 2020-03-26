### 日历选择器-不能跨月选择

```json
//app.json
  "usingComponents": {
    "calendar": "./components/calendar/index",
  }

```

```html
<calendar
  bind:datechange="datechange"
/>
```

```js
datechange(data){
  console.log(data.detail);
        // {
        //   startDate:2010/01/01
        //   endDate:2010/01/02
        //  }
}

```
