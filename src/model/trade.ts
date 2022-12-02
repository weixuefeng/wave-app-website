export interface TradeItem {
  nft_id: number
  name: string
  image: string
  token_id: string
  collection_id: number
  type: number
  is_owner: number
  price: string
  list_price_direction: number
  list_price_percent: string
  floor_difference_percent: string
}

export enum TradeType {
  NFT = 0,
  MOVIE = 1,
  SERIOS = 2,
  TICKET = 3,
  MUSIC = 4,
}
