import Vue from 'vue'

Vue.filter('plusZero', function (value) {
  value = value + 1
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
})
