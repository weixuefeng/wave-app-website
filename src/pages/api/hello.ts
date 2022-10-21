/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:07:34
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 11:11:03
 * @FilePath: /nextjs-starter-boilerplate/src/pages/api/hello.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import { WAVE_BASE_URL } from '../../constants/setting'

type Data = {
  name: string
  age: number
  country: string
}

const url = `${WAVE_BASE_URL}/api/v5/nft/mystery-box/detail`

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // post
  axios
    .post(url, req.body)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
      res.status(500)
    })
  //get
  axios
    .get(url)
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(error => {
      res.status(500)
    })
}
