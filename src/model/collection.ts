export interface BaseCollectionInfo {
  id: number
  name: string
  image: string
  banner: string
  symbol: string
  description: string
  creator: string
  status: number
  stats: CollectionStats
}

export interface CollectionStats {
  item_number: number
  owner_number: number
  floor_price: string
  volume_all: string
}
