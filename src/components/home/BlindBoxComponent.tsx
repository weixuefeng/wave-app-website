import { useTranslation } from 'react-i18next'

import React from 'react'

export function BlindBox(props) {
  const { item } = props
  const { t } = useTranslation()

  return (
    <div className="item">
      <div className="cover">
        <div className="perfect_square">
          <img alt={item.name} src={item.image} />
          <div className="status">sold out</div>
        </div>
      </div>
      <div className="profile">
        <h3>{item.name}</h3>
        <div className="footer">
          <div className="num-wrap">
            <div className="num-name">{t('CURRENT_RELEASE')}</div>
            <div className="num">{item.blind_box_total}</div>
          </div>
          <div className="price">{Number(item.price)} NEW</div>
        </div>
      </div>
    </div>
  )
}

export default function BlindBoxComponent(props) {
  const { blindBox } = props

  return (
    <div className="blind-box">
      <h1>MyStery Box</h1>

      <div className="list">
        {blindBox.map((item, index) => {
          return <BlindBox item={item} key={index} />
        })}
      </div>
    </div>
  )
}
