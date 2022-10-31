import { getAssetNameByType } from 'model/asset'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


export function AssetComponent(props) {
  const { asset } = props
  const router = useRouter()

  function goToAssetDetail() {
    router.push("/asset", '', {shallow: true})
  }

  function getAssetPath(): string {
    console.log(asset);
    return `/asset/${asset.type}/${asset.nft_id}`
  }

  return (
    <Link href={getAssetPath()}>
        <div className="assets">
      <img src={asset.image} alt={asset.name}/>
      <p>type: {getAssetNameByType(asset.type)}</p>
    </div>
    </Link>

  )
}


export default function HomeDataComonent(props) {

  const { homeData } = props
  if(!homeData){
    return <></>
  }
  const blindBox = homeData.mystery_boxes
  const recommend = homeData.recommend

  return (
    <div id="home" className="container">
      <div className="blind">
        <p className="title">
          MyStery Box
        </p>
        {blindBox && blindBox.map(element => {
          return <AssetComponent key={element.id} asset={element}/>
        })}
      </div>

      <div className="recommend">
        <p className="title">
          Recommend
        </p>
        {recommend && recommend.map(element => {
          return <AssetComponent key={element.id} asset={element}/>
        })}
      </div>
    </div>
  )
}


function userRouter() {
  throw new Error('Function not implemented.')
}

