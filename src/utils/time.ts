/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 18:48:14
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 00:07:53
 * @FilePath: /wave-app-webiste/src/utils/time.ts
 */
export function formatDate(value) {
  value = value * 1000
  let date = new Date(value)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let mm

  if (m == 1) {
    mm = 'January'
  } else if (m == 2) {
    mm = 'February'
  } else if (m == 3) {
    mm = 'March'
  } else if (m == 4) {
    mm = 'April'
  } else if (m == 5) {
    mm = 'May'
  } else if (m == 6) {
    mm = 'June'
  } else if (m == 7) {
    mm = 'July'
  } else if (m == 8) {
    mm = 'August'
  } else if (m == 9) {
    mm = 'September'
  } else if (m == 10) {
    mm = 'October'
  } else if (m == 11) {
    mm = 'November'
  } else if (m == 12) {
    mm = 'December'
  }
  return mm + ' ' + d + ',' + y
}

export function zhFormatDate(value) {
  value = value * 1000
  let date = new Date(value)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()

  return y + '-' + m + '-' + d
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
