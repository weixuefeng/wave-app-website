import CollectionComponent from 'components/asset/CollectionComponent'
import EVTDetailComponent from 'components/asset/EVTDetailComponent'
import NFTDetailComponent from 'components/asset/NFTDetailComponent'
import { AssetType } from 'model/asset'
import { useRouter } from 'next/router'
import React from 'react'

export default function AssetDetail() {
  const router = useRouter()
  const param = router.query.params || []
  if (param.length < 2) {
    return <>Error Params</>
  }

  const type = parseInt(param[0])
  const id = parseInt(param[1])

  if (type == AssetType.NFT) {
    return (
      <div>
        <NFTDetailComponent id={id} />
      </div>
    )
  } else if (type == AssetType.MOVIE) {
    return (
      <div>
        <EVTDetailComponent id={id} />
      </div>
    )
  } else if (type == AssetType.COLLECTION) {
    return (
      <div>
        <CollectionComponent id={id} />
      </div>
    )
  } else {
    return <div>AssetDetail</div>
  }
}
