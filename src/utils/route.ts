import { Asset, AssetType } from 'model/asset'

export function getAssetDetailPath(asset: Asset): string {
  if (asset.type == AssetType.NFT) {
    return `/asset/${asset.type}/${asset.nft_id}`
  } else if (asset.type == AssetType.COLLECTION) {
    return `/asset/${asset.type}/${asset.collection_id}`
  } else if (asset.type == AssetType.MOVIE) {
    return `/asset/${asset.type}/${asset.collection_id}`
  } else {
    return `/asset/${asset.type}/${asset.nft_id}`
  }
}
