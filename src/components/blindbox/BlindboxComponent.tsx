/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:01:13
 * @FilePath: /wave-app-webiste/src/components/blindbox/BlindboxComponent.tsx
 */

import ChainInfoComponent from 'components/asset/ChainInfoComponent'
import { CollectionInfo } from 'model/collection_model'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import { floorNum } from 'utils/functions'
import Log from 'utils/log'
import BaseInfo from './BaseInfo'
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
            <div className="info-img">
              <img src={collectionInfo.image} alt={collectionInfo.name} />
            </div>
            <div className="info-detail">
              <div className="count-down">
                <div className="time">Starts at 08.26 10:00(UTC+8)</div>
                <div className="drop">
                  <img src="/assets/image/icon_tips.png" alt="upcoming up" />
                  Upcoming Drop
                </div>
              </div>
              <BaseInfo collectionInfo={collectionInfo} />
              <div className="price">{floorNum(collectionInfo.sell_price)} NEW</div>
              <div className="action">Subscribe</div>
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

            <div className="detail-description">
              <div>
                <h3>Description</h3>
                <div className="description">
                  <div className="text">{collectionInfo.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
