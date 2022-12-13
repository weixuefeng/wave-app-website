/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-13 18:43:55
 * @FilePath: /wave-app-webiste/src/components/blindbox/StaticInfo.tsx
 */

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { CollectionInfo } from 'model/collection_model'
import MoreComponent from 'components/asset/MoreComponent'
import ChainInfoComponent from 'components/asset/ChainInfoComponent'

export default StaticInfo

function StaticInfo(props) {
  let { collectionInfo } = props
  const { t } = useTranslation()
  const info = collectionInfo as CollectionInfo

  return (
    <>
      <div className="info-content">
        <h3>{t('INTRODUCTION')}</h3>
        <div className="hidden md:block">
          <div className="content">
            <p>{collectionInfo.description}</p>
          </div>
        </div>
        <div className="mb-7 block md:hidden">
          <MoreComponent description={collectionInfo.description} />
        </div>
      </div>

      <div className="block md:hidden">
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

      <div className="info-content info-evt">
        <h3>{t('WHAT_IS_EVT')}</h3>
        <p>
          {t('WHAT_IS_EVT_INFO')}
          <Link href="https://www.newtonproject.org/en/evt/">
            <a target="_blank">...{t('MORE')}</a>
          </Link>
        </p>
      </div>
    </>
  )
}
