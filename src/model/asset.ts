export interface Asset {
  server_current_time: number
  index_id: number
  name: string
  nft_id: number
  collection_id: number
  type: number
  theme_color: string
  image: string
  price: any
  lowest_sell_price?: number
  highest_bid_price?: number
  running_time: number
  episodes: number
  icon?: string
  blind_box_sell_status: any
  blind_box_sell_start_time: any
  blind_box_reveals_time: any
  blind_box_total: any
  h5_url: any
}

export interface HomeList {
  mystery_boxes: Asset[]
  recommend: Asset[]
}

export interface HomeData {
  page_id: number
  total_page: number
  result: HomeList
}
