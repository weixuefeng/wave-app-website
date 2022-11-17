/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-17 20:50:11
 * @FilePath: /wave-app-website/src/utils/functions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE（
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

