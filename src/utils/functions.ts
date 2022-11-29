/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-29 17:12:50
 * @FilePath: /wave-app-webiste/src/utils/functions.ts
 */
import Log from './log'

export function splitAddress(address: string): string {
  if (!address) {
    return address
  }
  if (address.length < 12) {
    return address
  }
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 6)
  return `${start}...${end}`
}

export function trimStr(str: string): string {
  if (!str) {
    return str
  }
  if (str.length < 24) {
    return str
  }

  return str.substring(0, 20) + '...'
}

export default async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content)
    Log.d('copied to clipboard')
  } catch (error) {
    Log.e(error)
  }
}

export function floorNum(num) {
  return Math.floor(num * 100) / 100
}

export function isInViewPort(el) {
  if (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight + 100
  }
}

export function fillZero(num) {
  return Number(num) > 9 ? num.toString() : '0' + num.toString()
}

export function getUTCDetailTime(timestamp) {
  const time = new Date(timestamp * 1000 + 8 * 3600 * 1000)
  return `${fillZero(time.getUTCMonth() + 1)}.${fillZero(time.getUTCDate())} ${fillZero(time.getUTCHours())}:${fillZero(
    time.getUTCMinutes()
  )}:${fillZero(time.getUTCMinutes())} (UTC + 8)`
}

export function getUTCSummaryTime(timestamp) {
  const time = new Date(timestamp * 1000 + 8 * 3600 * 1000)
  return `${fillZero(time.getUTCHours())}:${fillZero(time.getUTCMinutes())}:${fillZero(time.getUTCSeconds())} (UTC + 8)`
}

export function calculateCountdown(remain) {
  let hrs = Math.floor(remain / 3600) || 0
  remain = remain % 3600
  let min = Math.floor(remain / 60) || 0,
    sec = remain % 60
  return `${fillZero(hrs)}:${fillZero(min)}:${fillZero(sec)}`
}

export function TicketsTypeList(type) {
  if (type == 0) {
    return '/assets/image/tickets_not_checked.png'
  } else if (type == 1) {
    return '/assets/image/tickets_checked.png'
  } else if (type == 2) {
    return '/assets/image/tickets_expired.png'
  }
}
