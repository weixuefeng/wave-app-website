/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:03:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 16:04:36
 * @FilePath: /nextjs-starter-boilerplate/src/pages/api/proxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { WAVE_BASE_URL } from '../../constants/setting'
import { NextApiRequest, NextApiResponse } from 'next'
import { decode } from 'js-base64'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const token = req.headers.accesstoken
  const http = axios.create({
    headers: {
      AccessToken: `${token}`,
      AcceptLanguage: 'zh',
    },
  })
  if (method.toLowerCase() === 'post') {
    const { internal_url, params } = req.body
    const url = `${WAVE_BASE_URL}${internal_url}`
    let config = {}
    if (url.indexOf('export') > -1) {
      config = {
        responseType: 'arraybuffer',
      }
    }
    http
      .post(url, params, config)
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(error => {
        console.log(`error url is: ${internal_url}`)
        res.status(400).json(error)
      })
  } else {
    const url = `${WAVE_BASE_URL}${splitUrl(req.url)}`
    http
      .get(url)
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(error => {
        console.log(`error url is: ${url}`)
        console.error(JSON.stringify(error))
        res.status(400).json(error)
      })
  }

  function splitUrl(url: string) {
    const info = url.split('proxy?path=')[1]
    const decodeInfo = decode(unescape(info))
    return decodeInfo
  }
}
