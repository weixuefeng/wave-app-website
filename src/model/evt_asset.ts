export interface EVTCopyDetail {
  id: number
  evt_id: number
  name: string
  image: string
  introduction: string
  country: string
  year: string
  type: any[]
  running_time: number
  play_list: PlayList[]
  status: number
  highest_bid_price: number
  lowest_bid_price: number
  price: any
  sell_start_time: number
  sell_end_time: number
  is_sell: number
  is_owner: number
  collection: Collection
  user: User
  current_user_is_have_copy: boolean
  current_user_watch_status: number
  current_user_watch_expire: number
  chain_info: ChainInfo
  sell_id: number
  nft_id: string
  is_official_sale: number
  copyright_expire_time: number
  creator_earnings_percent: string
  license_url: string
  properties: Property[]
}

export interface PlayList {
  id: number
  path: string
  running_time: number
}

export interface Collection {
  id: number
  name: string
  image: string
}

export interface User {
  id: number
  name: string
  avatar: string
  is_follow: number
  wallet_address: string
}

export interface ChainInfo {
  chain_id: number
  contract_address: string
  token_id: string
  token_standard: string
  block_chain: string
}

export interface Property {
  trait_type: string
  value: string
  proportion: string
  icon_types: string[]
}
