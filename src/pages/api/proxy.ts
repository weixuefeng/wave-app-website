/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:03:19
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-30 17:51:54
 * @FilePath: /wave-app-website/src/pages/api/proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { API_PREFIX, WAVE_BASE_URL } from '../../constants/setting'
import { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'js-base64'
import { API_VERSION } from 'constants/constant'
import Log from 'utils/log'

const http = axios.create({})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  if (method.toLowerCase() === 'post') {
    const { internal_url, params } = req.body
    const url = `${WAVE_BASE_URL}/${API_PREFIX}/v${API_VERSION}/${internal_url}`
    let config = {}
    try{
      const response = await http.post(url, params, config)
      Log.d(`-----${url} ---- \r\n request header: ${JSON.stringify(req.headers)} \r\n params: ${JSON.stringify(params)} \r\n response: \r\n ${JSON.stringify(response.data)}`)
      Log.d("----end----- \r\n\r\n")
      res.status(200).json(response.data)
    } catch(error) {
      Log.e(`error url is: ${url} error:${JSON.stringify(error)}`)
      res.status(400).json(error)
    }
  } else {
    const url = `${WAVE_BASE_URL}${splitUrl(req.url)}`
    try {
      const response = await http.get(url)
      Log.d(`success data:${JSON.stringify(response.data)}`)
      res.status(200).json(response.data)
    } catch(error) {
      Log.e(`error url is: ${url} error:${JSON.stringify(error)}`)
      res.status(400).json(error)
    }
  }

  function splitUrl(url: string) {
    const info = url.split('proxy?path=')[1]
    const decodeInfo = decode(unescape(info))
    return decodeInfo
  }
}
