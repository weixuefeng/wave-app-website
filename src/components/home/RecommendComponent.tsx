import { useTranslation } from 'react-i18next'
import React from 'react'
import { getAssetDetailPath } from 'utils/route'
import Link from 'next/link'
import { AssetType } from 'model/asset'
import Nodata from 'components/layout/NoData'

export function EVTAsset(props) {
  const { item } = props
  const { t } = useTranslation()

  function calculateRuningTime(time): string {
    const hour = parseInt((time / 3600).toString())
    const minute = parseInt(((time - 3600 * hour) / 60).toString())
    const second = time - 3600 * hour - minute * 60
    return `${hour}:${minute}:${second}`
  }

  return (
    // evt集合
    <Link href={getAssetDetailPath(item)}>
      <div className="item">
        <div className="cover">
          <div className="perfect_square">
            <img alt={item.name} src={item.image} />
            <div className="evt-icon">EVT</div>
          </div>
        </div>

        <div className="info-box">
          <p className="name truncate">{item.name}</p>
          <div className="price">
            <div className="label">{t('FLOOR_PRICE')}: </div>
            <div className="number">{Number(item.highest_bid_price)} NEW</div>
          </div>
          <div className="evt-flag">
            <img src="/assets/image/play_icon.png" alt="" />
            <span>{calculateRuningTime(item.running_time)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function NFTAsset(props) {
  const { item } = props
  const { t } = useTranslation()

  return (
    // nft
    <Link href={getAssetDetailPath(item)}>
      <div className="item nftItem">
        <div className="cover">
          <div className="perfect_square">
            <img alt={item.name} src={item.image} />
            <div className="nft-info">
              <div className="name truncate">{item.name}</div>
              <div className="price">
                <p>{t('FLOOR_PRICE')}:</p>
                <p className="number">{Number(item.highest_bid_price)} NEW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CollectionAsset(props) {
  const { item } = props
  const { t } = useTranslation()

  return (
    // nft 集合
    <Link href={getAssetDetailPath(item)}>
      <div className="item allNftItem">
        <div className="cover">
          <div className="perfect_square">
            <img alt={item.name} src={item.image} />
            <div className="collection">
              <img alt={item.name} src={item.icon} className="img-icon" />
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="title-collection truncate">{item.name}</div>
        </div>
      </div>
    </Link>
  )
}

export function Recommend(props) {
  const { item } = props
  const { t } = useTranslation()

  function getAssetByType() {
    switch (item.type) {
      case AssetType.NFT:
        return <NFTAsset {...props} />
      case AssetType.MOVIE:
      case AssetType.SERIOS:
        return <EVTAsset {...props} />
      case AssetType.COLLECTION:
        return <CollectionAsset {...props} />
      default:
        return <></>
    }
  }
  if (!item) {
    return <></>
  }

  return getAssetByType()
}

export default function RecommendComponent(props) {
  const { recommend } = props
  const { t } = useTranslation()
  if (!recommend) {
    return <></>
  }

  if (recommend?.length == 0) {
    return (
      <div className="recommend">
        <h1>
          <>{t('HOME_RECOMMAND')}</>
        </h1>
        <Nodata />
      </div>
    )
  }
  return (
    <div className="recommend">
      <h1>
        <>{t('HOME_RECOMMAND')}</>
      </h1>

      <div className="list">
        {recommend.map((item, index) => {
          return <Recommend item={item} key={index} />
        })}
      </div>
    </div>
  )
}
