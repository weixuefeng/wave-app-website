import CollectionComponent from 'components/asset/CollectionComponent'
import EVTDetailComponent from 'components/asset/EVTDetailComponent'
import NFTDetailComponent from 'components/asset/NFTDetailComponent'
import NormalLayout from 'components/layout/normalLayout'
import { AssetType } from 'model/asset'
import { PageModel } from 'model/navModel'
import { useRouter } from 'next/router'
import React from 'react'

export default function AssetDetail() {
  const router = useRouter()
  let pageModel = new PageModel('Asset', 'AssetDetail', '')

  const param = router.query.params || []
  if (param.length < 2) {
    return <>Error Params</>
  }

  const type = parseInt(param[0])
  const id = parseInt(param[1])

  function getContentByType() {
    switch (type) {
      case AssetType.NFT:
        return <NFTDetailComponent id={id} />
      case AssetType.MOVIE:
        return <EVTDetailComponent id={id} />
      case AssetType.COLLECTION:
        return <CollectionComponent id={id} />
      default:
        return <></>
    }
  }

  function content() {
    return (
      <div id="asset" className="container mx-auto pb-20">
        {getContentByType()}
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
