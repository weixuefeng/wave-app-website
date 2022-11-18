/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:08:35
 * @FilePath: /wave-app-webiste/src/components/blindbox/Countdown.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'

export default Countdown

function Countdown(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <div className="count-down">
      <div className="time">Starts at 08.26 10:00(UTC+8)</div>
      <div className="drop">
        <img src="/assets/image/icon_tips.png" alt="upcoming up" />
        Upcoming Drop
      </div>
    </div>
  )
}
