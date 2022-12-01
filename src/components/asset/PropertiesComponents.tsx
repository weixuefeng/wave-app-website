import { Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function Property(props) {
  const { t } = useTranslation()
  const { property } = props

  function getTypeIcon(type: string) {
    switch (type) {
      case 'ENCRYPTION':
        return (
          <Tooltip placement="top" title={t('ENCRYPTED')}>
            <img className="img" src="/assets/image/icon_lock.png" alt="img_lock" />
          </Tooltip>
        )
      case 'VARIABLE':
        return (
          <Tooltip placement="top" title={t('VARIABLE')}>
            <img className="img" src="/assets/image/icon_var.png" alt="img_var" />
          </Tooltip>
        )
      default:
        return <></>
    }
  }

  return (
    <div className="property">
      <p className="type">{property.trait_type}</p>
      <p className="value">{property.value}</p>
      <p className="proportion">{property.proportion}</p>
      {property.icon_types && getTypeIcon(property.icon_types[0])}
    </div>
  )
}

export default function PropertiesComponents(props) {
  const { properties } = props

  return (
    <div className="properties">
      {properties.map((element, index) => {
        return <Property key={index} property={element} />
      })}
    </div>
  )
}
