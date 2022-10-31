/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-31 15:04:49
 * @LastEditors: zxt0805 zhuxiaotong@diynova.com
 * @LastEditTime: 2022-10-31 17:30:55
 * @FilePath: /wave-app-website/src/components/mystery/mystery_item.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import HeadImg from 'components/mystery/headImg'

export default MysteryItem

function MysteryItem(props) {
  const { t } = useTranslation()

  let { collectionInfo, width, height } = props

  useEffect(() => {
    
  }, [])

  return (
    <div className="mystery-item">
      <HeadImg collectionInfo={collectionInfo} width={width} height={height} />
      <div className="info-box">
        <p className="title">{collectionInfo.name}</p>
        <div className="info">
          <div className="num-wrap">
            <div className="num-name">{t('CURRENT_RELEASE')}</div>
            <div className="num">{collectionInfo.blind_box_total}</div>
          </div>
          <div className="price">{Number(collectionInfo.price)} NEW</div>
        </div>
      </div>
    </div>
  )
}
