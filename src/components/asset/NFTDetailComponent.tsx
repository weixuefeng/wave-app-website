import { NFTDetail } from 'model/nft_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'

export default function NFTDetailComponent(props) {
  const { id } = props

  const [nftDetail, setNFTDetail] = useState<NFTDetail>(null)

  useEffect(() => {
    Http.getInstance()
      .getNFTInfo(parseInt(id))
      .then(response => {
        setNFTDetail(response.result)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  if (!nftDetail || !id) {
    return <>loading...</>
  }

  return <div>NFTDetailComponent</div>
}
