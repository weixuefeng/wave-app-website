/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-13 18:39:44
 * @FilePath: /wave-app-webiste/src/components/blindbox/BlindboxComponent.tsx
 */

import ChainInfoComponent from 'components/asset/ChainInfoComponent'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BaseInfo from './BaseInfo'
import Countdown from './Countdown'
import Description from './Description'
import InfoImg from './InfoImg'
import SellPriceBtn from './SellPriceBtn'
import StaticInfo from './StaticInfo'

export default function BlindboxComponent(props) {
  const { addToCalendar, payOrder, gotoTrade, gotoAssets, collectionInfo, hasAddCalendar } = props

  const router = useRouter()
  const { t } = useTranslation()

  if (collectionInfo !== undefined) {
    return (
      <div className="blindbox">
        <div className="container mx-auto">
          <div className="blindbod-detail">
            <div className="block md:hidden">
              <Countdown collectionInfo={collectionInfo} />
            </div>
            <InfoImg collectionInfo={collectionInfo} />
            <div className="info-detail">
              <div className="hidden md:block">
                <Countdown collectionInfo={collectionInfo} />
              </div>
              <BaseInfo collectionInfo={collectionInfo} />
              <SellPriceBtn
                collectionInfo={collectionInfo}
                hasAddCalendar={hasAddCalendar}
                addToCalendar={() => addToCalendar()}
                payOrder={() => payOrder()}
                gotoTrade={() => gotoTrade()}
                gotoAssets={() => gotoAssets()}
              />
            </div>
          </div>
          <div className="evt-detail blindbox-detail">
            <div className="detail-info">
              {/* pc */}
              <div className="hidden md:block">
                <div className="info-specifications">
                  <h3>{t('SPECIFICATTIONS')}</h3>
                  <ChainInfoComponent
                    address={collectionInfo.specifications.contract_address}
                    tokenStandard={collectionInfo.specifications.token_standard}
                    blockChain={collectionInfo.specifications.block_chain}
                    creatorEariningPercent={collectionInfo.specifications.creator_earnings}
                    tipCreatorEarningsPercent={collectionInfo.specifications.creator_earnings}
                  />
                </div>
              </div>
              <StaticInfo collectionInfo={collectionInfo} />
            </div>

            <Description collectionInfo={collectionInfo} />
          </div>
        </div>
      </div>
    )
  }
}
