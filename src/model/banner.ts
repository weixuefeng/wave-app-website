export interface Banner {
  url: string
  image: string
}

export interface Mystery{
  blind_box_reveals_time: number | null
  blind_box_sell_start_time: number | null
  blind_box_sell_status: number 
  blind_box_total: number
  collection_id: number
  episodes: number
  h5_url: string
  highest_bid_price: number
  icon: any
  image: string
  index_id: number
  lowest_sell_price: number
  name: string
  nft_id: number
  price: string
  running_time: number
  server_current_time: number
  theme_color: string
  type: number
}

export interface Recommend{
  blind_box_reveals_time: number | null
  blind_box_sell_start_time: number | null
  blind_box_sell_status: number | null
  blind_box_total: number | null
  collection_id: number
  episodes: number
  h5_url: string | null
  highest_bid_price: number | null
  icon: any
  image: string
  index_id: number
  lowest_sell_price: number | null
  name: string
  nft_id: number
  price: number | null
  running_time: number
  server_current_time: number
  theme_color: string
  type: number
}
