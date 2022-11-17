/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 21:33:59
 * @FilePath: /wave-app-webiste/src/model/collection.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

export interface CollectionAllItem {
  collection_id: number
  collection_name: string
  creator: string
  current_user_is_owner: boolean
  highest_bid_price: number
  id: number
  image: string
  is_official_sale: number
  name: string
  nft_id: number
  sell_id: number
  sell_price: number | null
  sell_status: number
  status: number
  token_id: string
}
