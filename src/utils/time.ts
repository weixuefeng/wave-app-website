/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 18:48:14
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-03 19:55:26
 * @FilePath: /wave-app-webiste/src/utils/time.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
