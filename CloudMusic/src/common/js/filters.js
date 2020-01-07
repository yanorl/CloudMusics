import Vue from 'vue'

Vue.filter('plusZero', function (value) {
  value = value + 1
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
})

Vue.filter('toNumber', function (num) {
  let str = ''
  if (num < 10000) {
    str = num
  } else {
    num = Math.round(num / 10000)
    str = num + '万'
  }
  return str
})

Vue.filter('subStr', function (value) {
  if (value && value.length > 20) {
    return value.substr(0, 20) + '...'
  } else {
    return value
  }
})
