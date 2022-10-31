export interface Asset {
  server_current_time: number
  index_id: number
  name: string
  nft_id: number
  collection_id: number
  type: number // nft:0, movie:1,serios:2, collections:4, blind_box:5
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

export function getAssetNameByType(type: number): string {
  switch (type) {
    case 0: return "nft";
    case 1: return "movie";
    case 2: return "serios";
    case 4: return "collections";
    case 5: return "blind_box";
    default: break;
  }
  return "";
}

export enum AssetType {
  NFT = 0,
  MOVIE = 1, 
  SERIOS = 2,
  COLLECTION = 4,
  BLIND_BOX = 5
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
