import React from 'react'

export function Property(props) {
  const { property } = props

  function getTypeIcon(type: string) {
    switch (type) {
      case "ENCRYPTION":
        return <img src="/assets/image/icon_lock.png" alt="img_lock"/>
      case "VARIABLE":
          return <img src="/assets/image/icon_var.png" alt="img_var"/>
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
  const {properties} = props

  return (
    <div className="properties">
      {properties.map((element, index) => {
        return <Property key={index} property={element}/>
      })}
    </div>
  )
}
