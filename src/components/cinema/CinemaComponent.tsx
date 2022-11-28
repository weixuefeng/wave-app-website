/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 10:42:08
 * @FilePath: /wave-app-webiste/src/components/cinema/CinemaComponent.tsx
 */

import React from 'react'
import { formatSeconds } from 'utils/time'

export default function CinemaComponent(props) {
  const { item, openModal } = props

  return (
    <div className="item" onClick={openModal()}>
      <div className="img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="type">EVT</div>
      <div className="info-bg">
        <div className="info">
          <div className="name">
            <h5>{item.name}</h5>
            <p>{formatSeconds(item.running_time)}</p>
          </div>
          <div className="pic">
            <img src="/assets/image/icon_play.png" alt="play icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
