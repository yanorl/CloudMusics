export function debounce (func, delay) {
  let timer
  return function (...args) {
    console.log(args)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function timeStamp (timestamp) {
  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  return (Y + M + D)
}

export function durationStamp (timestamp) {
  timestamp = timestamp / 1000 | 0
  const minute = _pad(timestamp / 60 | 0)
  const second = _pad(timestamp % 60)
  return `${minute}:${second}`
}

export function _pad (num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
