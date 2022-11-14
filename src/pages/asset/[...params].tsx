import EVTDetailComponent from 'components/asset/EVTDetailComponent'
import NFTDetailComponent from 'components/asset/NFTDetailComponent'
import NormalLayout from 'components/layout/normalLayout'
import { AssetPageType } from 'model/asset'
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
      case AssetPageType.NFT:
        return <NFTDetailComponent id={id} />
      case AssetPageType.EVT:
        return <EVTDetailComponent id={id} />
      default:
        return <>unSupport asset type</>
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
