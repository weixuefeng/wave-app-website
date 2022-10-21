/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-08 12:38:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 11:21:10
 * @FilePath: /wave-global-h5/src/services/http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

export function getRequest(url: string) {
  return axios.get(url)
}

export function postRequest(url: string, params: {}) {
  return axios.post(url, params)
}
