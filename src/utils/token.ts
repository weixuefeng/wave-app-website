/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:08:36
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 16:10:20
 * @FilePath: /nextjs-starter-boilerplate/src/utils/token.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// get token
export function getToken(key) {
  let getToken: any
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    getToken = window.localStorage.getItem(key)
  }
  return getToken
}

// set token
export function setToken(key, token) {
  let getToken: any
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    getToken = window.localStorage.setItem(key, token)
  }
  return getToken
}
