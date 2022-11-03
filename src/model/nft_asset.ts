export interface Creator {
  id: number
  name: string
  avatar: string
  is_follow: number
}

export interface Collection {
  id: number
  name: string
  image: string
  creator: Creator
}

export interface User {
  id: number
  name: string
  avatar: string
  is_follow: number
  wallet_address: string
}

export interface Stats {
  share_number: number
  like_number: number
  favorite_number: number
  comment_number: number
}

export interface ChainInfo {
  chain_id: number
  contract_address: string
  token_id: string
  token_standard: string
  block_chain: string
}

export interface RelatedNft {
  id: number
  name: string
  image: string
  status: number
  collection_id: number
  collection_name: string
  sell_price: string
  sell_status: number
}

export interface Property {
  trait_type: string
  value: string
  proportion: string
  icon_types: string[]
}
export interface NFTDetail {
  id: number
  name: string
  description: string
  image: string
  image_width: number
  image_height: number
  external_url: string
  animation_url: string
  destination_url: string
  is_liked: number
  is_favorite: number
  sell_id: number
  direction_address: string
  is_sell: number
  is_owner: number
  price: any
  sell_start_time: number
  sell_end_time: number
  server_time: number
  created_at: number
  share_link: string
  properties: Property[]
  collection: Collection
  user: User
  stats: Stats
  chain_info: ChainInfo
  bid_count: number
  bid_list: any[]
  wave_count: number
  wave_list: any[]
  related_nfts: RelatedNft[]
  highest_bid_price: any
  lowest_bid_price: any
  creator_earnings_percent: string
  license_url: string
  is_official_sale: number
}
