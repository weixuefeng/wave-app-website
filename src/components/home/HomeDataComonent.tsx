import React from 'react'


export function AssetComponent(props) {
  const { asset } = props
  return (
    <div className="assets">
      <img src={asset.image} alt={asset.name}/>
    </div>
  )
}


export default function HomeDataComonent(props) {
  console.log(props)

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


