/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-01 15:43:16
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-15 11:35:18
 * @FilePath: /wave-app-website/src/model/asset.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Mystery, Recommend } from './banner'

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
  mystery_box_id?: number // if asset is blind box, mystery_box_id has value
  issue_type: number
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
    case 0:
      return 'nft'
    case 1:
      return 'movie'
    case 2:
      return 'serios'
    case 4:
      return 'collections'
    case 5:
      return 'blind_box'
    default:
      break
  }
  return ''
}

export enum AssetType {
  NFT = 0,
  MOVIE = 1,
  SERIOS = 2,
  COLLECTION = 4,
  BLIND_BOX = 5,
}

export enum AssetPageType {
  NFT = 0,
  EVT = 1,
}

export enum CollectionPageType {
  NFT = 0,
  EVT = 1,
}

export interface HomeList {
  mystery_boxes: Mystery[]
  recommend: Recommend[]
}

export interface HomeData {
  page_id: number
  total_page: number
  result: HomeList
}

export interface CollectionItem {
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

export interface CollectionActivitiesItem {
  activity_time: number
  collection: Collection
  collection_id: number
  event: string
  event_name: string
  from_user: FromUser
  from_user_id: number
  id: number
  nft: Nft
  nft_id: number
  price: string
  to_user: ToUser
  to_user_id: number
}

export interface Collection {
  id: number
  image: string
  name: string
}

export interface FromUser {
  avatar: string
  id: number
  name: string
}

export interface Nft {
  id: number
  image: string
  name: string
}

export interface ToUser {
  avatar: string
  id: number
  name: string
}

export interface MyAsset {
  sell_id: number
  nft_id: number
  collection_id: number
  name: string
  image: string
  ask_price: number
  price: number
  status: number
  type: number
  ticket_number: number
  create_ticket_number: number
  max_create_ticket_number: number
  token_id: number
  owner_address: string
  copyright_expire_time?: number
  is_copyright_expire: boolean
}

export interface AssetsMyOwnData {
  ask_price: number
  collection_id: number
  copyright_expire_time?: number
  create_ticket_number: number
  image: string
  is_copyright_expire: boolean
  max_create_ticket_number: number
  name: string
  nft_id: number
  owner_address: string
  price: number
  sell_id: number
  status: number
  ticket_number: number
  token_id: number
  type: number
}

export interface AssetsOrderOnSaleData {
  collection: OrderOnSaleCollection
  created_at: number
  direction_address: string
  expire_time: number
  id: number
  nft: OrderOnSaleNft
  nft_id: number
  price: string
  status: number
}

export interface OrderOnSaleCollection {
  id: number
  image: string
  name: string
  type: number
}

export interface OrderOnSaleNft {
  id: number
  image: string
  image_height: number
  image_width: number
  name: string
  sell_id: number
  token_id: string
  type: number
}

export interface AssetMyOfferData {
  collection: MyOfferCollection
  created_at: number
  expire_time: number
  from: MyOfferFrom
  has_more: number
  id: number
  nft: MyOfferNft
  nft_id: number
  price: string
  status: number
  to: MyOfferTo
}

export interface MyOfferCollection {
  id: number
  image: string
  name: string
  type: number
}

export interface MyOfferFrom {
  avatar: string
  id: number
  name: string
}

export interface MyOfferNft {
  id: number
  image: string
  image_height: number
  image_width: number
  name: string
  sell_id: number
  token_id: string
  type: number
}

export interface MyOfferTo {
  avatar: string
  id: number
  name: string
}

export enum AssetSellStatus {
  SELLING = 1,
  NOT_SELL = 0,
}
