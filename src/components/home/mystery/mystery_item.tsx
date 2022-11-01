/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-31 15:04:49
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-01 11:42:28
 * @FilePath: /wave-app-webiste/src/components/home/mystery/mystery_item.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {  } from 'react'

import { useTranslation } from 'react-i18next'
import HeadImg from 'components/home/mystery/headImg'
import Link from 'next/link'
import { getAssetDetailPath } from 'utils/route'

export default MysteryItem

function MysteryItem(props) {
  const { t } = useTranslation()
  const { collectionInfo, width, height } = props
  const path = getAssetDetailPath(collectionInfo)

  return (
    <Link href={path}>
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
    </Link>
  )
}
