/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 00:08:24
 * @FilePath: /wave-app-webiste/src/components/message/MessageComponent.tsx
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatDate, zhFormatDate } from 'utils/time'

export default function MessageComponent(props) {
  const { i18n } = useTranslation()
  const { item } = props

  return (
    <li className="item">
      <div className="date">{i18n.language == 'en' ? formatDate(item.receive_at) : zhFormatDate(item.receive_at)}</div>
      <div className="content">
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </div>
    </li>
  )
}
