import { AssetType } from 'model/asset'
import { useRouter } from 'next/router'
import React from 'react'

export function NFTDetailComponent(props) {
  return (
    <>
    NFTDetailComponent
    </>
  )
}

export function EVTDetailComponent(props) {
  return (
    <>
    EVTDetailComponent
    </>
  )
}

export function CollectionComponent(props) {
  return (
    <>
    CollectionComponent
    </>
  )
}


export default function AssetDetail(req, res) {
  const router = useRouter()
  const param = router.query.params || []
  if(param.length < 2) {
    return <>Error Params</>
  }

  const type = parseInt(param[0])
  const id = parseInt(param[1])
  
  if(type == AssetType.NFT) {
    return (
      <div>
        <NFTDetailComponent/>
      </div>
    )
  } else if(type == AssetType.MOVIE) {
    return (
      <div>
        <EVTDetailComponent/>
      </div>
    )
  } else if(type == AssetType.COLLECTION) {
    return (
      <div>
        <CollectionComponent/>
      </div>
    )
  } else {
    return (
      <div>AssetDetail</div>
    )
  }
}
