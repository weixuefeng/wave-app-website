/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:14:02
 * @FilePath: /wave-app-webiste/src/components/blindbox/BlindboxComponent.tsx
 */

import ChainInfoComponent from 'components/asset/ChainInfoComponent'
import { CollectionInfo } from 'model/collection_model'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'
import BaseInfo from './BaseInfo'
import Countdown from './Countdown'
import Description from './Description'
import InfoImg from './InfoImg'
import SellPriceBtn from './SellPriceBtn'
import StaticInfo from './StaticInfo'

export default function BlindboxComponent(props) {
  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    fetchCollectionInfo()
  }, [id])

  function fetchCollectionInfo() {
    Http.getInstance()
      .getMysteryBoxDetail(id.toString())
      .then(response => {
        setCollectionInfo(response)
      })
  }

  Log.d(collectionInfo)

  if (collectionInfo !== undefined) {
    return (
      <div className="blindbox">
        <div className="container">
          <div className="blindbod-detail">
            <InfoImg collectionInfo={collectionInfo} />
            <div className="info-detail">
              <Countdown collectionInfo={collectionInfo} />
              <BaseInfo collectionInfo={collectionInfo} />
              <SellPriceBtn collectionInfo={collectionInfo} />
            </div>
          </div>
          <div className="evt-detail">
            <div className="detail-info">
              <div className="info-specifications">
                <h3>Specifications</h3>
                <ChainInfoComponent
                  address={collectionInfo.specifications.contract_address}
                  tokenStandard={collectionInfo.specifications.token_standard}
                  blockChain={collectionInfo.specifications.block_chain}
                  creatorEariningPercent={collectionInfo.specifications.creator_earnings}
                />
              </div>
              <StaticInfo />
            </div>
            <Description collectionInfo={collectionInfo} />
          </div>
        </div>
      </div>
    )
  }
}
