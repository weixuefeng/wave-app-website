import Image from 'next/image'
import React from 'react'

export default function BannerComponent(props) {
  const { banners } = props
  console.log('props')
  console.log(banners)

  if (banners && banners.length > 0) {
    return <div>{banners == undefined ? <></> : <img alt="" src={banners[0].image} />}</div>
  } else {
    return <></>
  }
}
