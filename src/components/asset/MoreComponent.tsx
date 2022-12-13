/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:43:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-13 18:50:34
 * @FilePath: /wave-app-webiste/src/components/asset/MoreComponent.tsx
 */

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MoreComponent(props) {
  const { t } = useTranslation()
  const { description } = props

  // 简介 点击展示更多
  const multiRow = useRef(null)
  const [showDescription, setShowDescription] = useState(false)
  const [needMore, setNeedMore] = useState(false)

  useEffect(() => {
    const height = parseInt(getComputedStyle(multiRow.current).height)
    const lineHeight = parseInt(getComputedStyle(multiRow.current).lineHeight)
    if (height > lineHeight * 4) {
      setShowDescription(true)
      setNeedMore(true)
    }
  }, [])

  return (
    <div className="content">
      <p className={showDescription ? 'multi-row' : ''} ref={multiRow}>
        {description}
      </p>
      {needMore ? (
        <span
          className="more"
          onClick={() => {
            setShowDescription(!showDescription)
          }}
        >
          {showDescription ? t('MORE') : t('COLLAPSE')}
        </span>
      ) : null}
    </div>
  )
}
