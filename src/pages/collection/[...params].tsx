import CollectionComponent from 'components/asset/CollectionComponent'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { useRouter } from 'next/router'
import React from 'react'

export default function CollectionDetail() {
  const router = useRouter()
  let pageModel = new PageModel('Asset', 'CollectionDetail', '')

  const param = router.query.params || []
  if (param.length < 2) {
    return <>Error Params</>
  }

  const type = parseInt(param[0])
  const id = parseInt(param[1])

  function content() {
    return (
      <div id="asset" className="container mx-auto pb-20">
        <CollectionComponent id={id} type={type} />
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
