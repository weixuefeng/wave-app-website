/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:03:19
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-30 11:56:27
 * @FilePath: /wave-app-website/src/pages/api/proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { API_PREFIX, WAVE_BASE_URL } from '../../constants/setting'
import { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'js-base64'
import { API_VERSION } from 'constants/constant'
import Log from 'utils/log'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const http = axios.create({})
  if (method.toLowerCase() === 'post') {
    const { internal_url, params } = req.body
    const url = `${WAVE_BASE_URL}/${API_PREFIX}/v${API_VERSION}/${internal_url}`
    let config = {}
    Log.d(url + "\r\n")
    Log.d(params)
    http
      .post(url, params, config)
      .then(response => {
        Log.d(`success data:${JSON.stringify(response.data)}\r\n\r\n`)
        res.status(200).json(response.data)
      })
      .catch(error => {
        Log.e(`error url is: ${url} error:${JSON.stringify(error)}`)
        res.status(400).json(error)
      })
  } else {
    const url = `${WAVE_BASE_URL}${splitUrl(req.url)}`
    http
      .get(url)
      .then(response => {
        Log.d(`success data:${JSON.stringify(response.data)}`)
        res.status(200).json(response.data)
      })
      .catch(error => {
        Log.e(`error url is: ${url} error:${JSON.stringify(error)}`)
        res.status(400).json(error)
      })
  }

  function splitUrl(url: string) {
    const info = url.split('proxy?path=')[1]
    const decodeInfo = decode(unescape(info))
    return decodeInfo
  }
}
