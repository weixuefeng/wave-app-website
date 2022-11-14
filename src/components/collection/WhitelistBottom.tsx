/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-09-29 16:09:48
 * @FilePath: /wave-global-h5/src/components/collection/WhitelistBottom.tsx
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-10 21:11:38
 * @FilePath: /wave-chinese-website/src/components/collection/fixedBottom.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React, { useEffect, useState } from 'react'

import { CollectionInfo, IsWhiteList, UserInWhiteList } from 'model/collection_model'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getUTCDetailTime } from 'utils/functions'

export default WhitelistBottom

function WhitelistBottom(props) {
  const { t } = useTranslation()
  const { collectionInfo } = props
  const info = collectionInfo as CollectionInfo
  if (!info) {
    return <></>
  }
  if (info.have_white_list == IsWhiteList.NO) {
    return <></>
  }

  function isWhiteList() {
    return (
      <div className="whitelist">
        <span className="whitelist-selected">
          <img className="selected" src="/assets/image/icon_selected.png" alt="selected" />
          {t('JOINED_WHITELIST_TIP')}
        </span>
        {info.white_list_settings.whitelist_url && (
          <Link href={info.white_list_settings.whitelist_url} passHref={true}>
            <p>{t('Details')} &gt;</p>
          </Link>
        )}
      </div>
    )
  }

  function isNotWhiteList() {
    return (
      <div className="whitelist">
        <span>
          {t('WHITE_LIST_PURCHASE_TIME')} {getUTCDetailTime(info.white_list_settings.preemption_start_at)}
        </span>
        {info.white_list_settings.whitelist_url && (
          <Link href={info.white_list_settings.whitelist_url} passHref={true}>
            <p>{t('Details')} &gt;</p>
          </Link>
        )}
      </div>
    )
  }

  function content() {
    const now = Date.now() / 1000
    if (info.have_white_list == IsWhiteList.YES) {
      // is white list
      if (now > info.white_list_settings.preemption_end_at) {
        // white list sell end, hide tip
        return <></>
      } else {
        if (info.current_user_in_white_list == UserInWhiteList.YES) {
          return isWhiteList()
        } else {
          return isNotWhiteList()
        }
      }
    } else {
      // is not white list
      return <></>
    }
  }

  return <div className="whitelistBottom">{content()}</div>
}
