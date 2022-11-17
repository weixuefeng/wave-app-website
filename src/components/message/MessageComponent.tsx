/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 20:29:08
 * @FilePath: /wave-app-webiste/src/components/trade/TradeComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import { formatDate } from 'utils/time'

export default function MessageComponent(props) {
  const { item } = props

  return (
    <li className="item">
      <div className="date">{formatDate(item.receive_at)}</div>
      <div className="content">
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </div>
    </li>
  )
}
