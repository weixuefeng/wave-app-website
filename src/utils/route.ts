import { Asset, AssetPageType, AssetType } from 'model/asset'
import { TradeItem, TradeType } from 'model/trade'
import Log from './log'

/**
 * if asset type is nft,evt, return to asset page
 * else if asset type is collection, movie, serios, return to collection page.
 * @param asset home page asset type
 * @returns '/asset/{asset.tpye}/{id}'
 */
export function getAssetDetailPath(asset: Asset): string {
  if (asset.type == AssetType.NFT) {
    return `/asset/${AssetPageType.NFT}/${asset.nft_id}`
  } else if (asset.type == AssetType.COLLECTION) {
    return `/collection/${AssetPageType.NFT}/${asset.collection_id}`
  } else if (asset.type == AssetType.MOVIE || asset.type == AssetType.SERIOS) {
    return `/collection/${AssetPageType.EVT}/${asset.collection_id}`
  } else if (asset.type == AssetType.BLIND_BOX) {
    // todo: update blind box route
    return `/blindbox/${asset.mystery_box_id}`
  }
}

/**
 * trade page has nft, evt
 * @param asset
 * @returns '/asset/{nft,evt}/{nft_id}'
 */
export function getAssetDetailPathByTradeItem(asset: TradeItem): string {
  if (asset.type == TradeType.NFT) {
    return `/asset/${AssetPageType.NFT}/${asset.nft_id}`
  } else if (
    asset.type == TradeType.MOVIE ||
    asset.type == TradeType.SERIOS ||
    asset.type == TradeType.MUSIC ||
    asset.type == TradeType.TICKET
  ) {
    return `/asset/${AssetPageType.EVT}/${asset.nft_id}`
  } else {
    return `/asset/${AssetPageType.NFT}/${asset.nft_id}`
  }
}

/**
 *
 * @param assetType nft, evt type
 * @param nftId
 * @returns '/asset/{nft,evt}/{nft id}'
 */
export function getAssetDetailPathByInfo(assetType: AssetType, nftId: number) {
  return `/asset/${assetType}/${nftId}`
}
