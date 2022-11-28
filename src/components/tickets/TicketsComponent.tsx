/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 14:07:13
 * @FilePath: /wave-app-webiste/src/components/tickets/TicketsComponent.tsx
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { TicketsTypeList } from 'utils/functions'
import { formatDateTimeNoSeconds } from 'utils/time'

export default function TicketsComponent(props) {
  const { t } = useTranslation()
  const { item, openModal } = props

  return (
    <div className="item" onClick={openModal}>
      <div className="img">
        <img src="/assets/image/tickets_bg.png" alt="tickets background" />
      </div>
      <div className="info">
        <h2>{item.name}</h2>
        <div className="content">
          <div className="content-img">
            <div className="img-box">
              <img src={item.image} alt={item.name} />
            </div>
          </div>
          <div className="time">
            <h3>{t('PURCHSSE_TIME')}</h3>
            <p>{formatDateTimeNoSeconds(item.purchase_time)}</p>
            <h3 className="time-check">{t('CHECK_IN_DEADINE')}</h3>
            <p>{formatDateTimeNoSeconds(item.copyright_expire_time)}</p>
          </div>
        </div>
      </div>
      <div>
        <img src={TicketsTypeList(item.type)} alt="tickets" />
      </div>
    </div>
  )
}
