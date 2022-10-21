/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-08 12:38:29
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-10-21 14:58:58
 * @FilePath: /wave-app-webiste/src/services/getAxios.ts
 */
import axios from 'axios'

export function getRequest(url: string) {
  return axios.get(url)
}

export function postRequest(url: string, params: {}) {
  return axios.post(url, params)
}
