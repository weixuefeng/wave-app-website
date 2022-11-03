import { Asset, AssetType } from 'model/asset'
import { TradeItem } from 'model/trade'

export function getAssetDetailPath(asset: Asset): string {
  if (asset.type == AssetType.NFT) {
    return `/asset/${asset.type}/${asset.nft_id}`
  } else if (asset.type == AssetType.COLLECTION) {
    return `/asset/${asset.type}/${asset.collection_id}`
  } else if (asset.type == AssetType.MOVIE || asset.type == AssetType.SERIOS) {
    return `/asset/${asset.type}/${asset.collection_id}`
  } else {
    return `/asset/${asset.type}/${asset.nft_id}`
  }
}

export function getAssetDetailPathByTradeItem(asset: TradeItem): string {
  if (asset.type == AssetType.NFT) {
    return `/asset/${0}/${asset.nft_id}`
  } else if (asset.type == AssetType.COLLECTION) {
    return `/asset/${0}/${asset.nft_id}`
  } else if (asset.type == AssetType.MOVIE) {
    return `/asset/${0}/${asset.nft_id}`
  } else {
    return `/asset/${0}/${asset.nft_id}`
  }
}
