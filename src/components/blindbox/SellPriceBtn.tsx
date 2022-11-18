/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:10:48
 * @FilePath: /wave-app-webiste/src/components/blindbox/SellPriceBtn.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'
import { floorNum } from 'utils/functions'

export default SellPriceBtn

function SellPriceBtn(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <>
      <div className="price">{floorNum(collectionInfo.sell_price)} NEW</div>
      <div className="action">Subscribe</div>
    </>
  )
}
