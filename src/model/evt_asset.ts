export interface PlayList {
  id: number
  path: string
  running_time: number
}

export interface ChainInfo {
  contract_address: string
  token_standard: string
  block_chain: string
}

export interface EVTDetail {
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
  highest_sell_price: number
  lowest_sell_price: number
  collection_id: number
  current_user_is_have_copy: boolean
  current_user_watch_status: number
  current_user_watch_expire: number
  detail: ChainInfo
  sell_id: number
  nft_id: number
  copyright_expire_time: number
  creator_earnings_percent: string
  license_url: string
}
