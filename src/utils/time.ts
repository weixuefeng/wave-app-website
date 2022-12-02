/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 18:48:14
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 15:39:33
 * @FilePath: /wave-app-webiste/src/utils/time.ts
 */
export function formatDate(value) {
  value = value * 1000
  let date = new Date(value)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let mm

  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  if (M == 1) {
    mm = 'January'
  } else if (M == 2) {
    mm = 'February'
  } else if (M == 3) {
    mm = 'March'
  } else if (M == 4) {
    mm = 'April'
  } else if (M == 5) {
    mm = 'May'
  } else if (M == 6) {
    mm = 'June'
  } else if (M == 7) {
    mm = 'July'
  } else if (M == 8) {
    mm = 'August'
  } else if (M == 9) {
    mm = 'September'
  } else if (M == 10) {
    mm = 'October'
  } else if (M == 11) {
    mm = 'November'
  } else if (M == 12) {
    mm = 'December'
  }

  return mm + ' ' + D + ',' + Y + ' ' + ' ' + ' ' + h + m + s
}

export function zhFormatDate(value) {
  value = value * 1000
  let date = new Date(value)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()

  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return Y + '/' + M + '/' + D + ' ' + h + m + s
}

export function formatDateTime(timestamp) {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

export function formatDateTimeNoSeconds(timestamp) {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return Y + M + D + h + m
}

export function formatSeconds(value) {
  let result = parseInt(value)
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  let m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
  let s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)

  let res = ''
  if (h !== '00') res += `${h}:`
  if (m !== '00') res += `${m}:`
  res += `${s}`
  return res
}
