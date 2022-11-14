export interface BaseResponse {
  result: CollectionInfo
  error_message: string
  error_code: number
}

export interface CollectionInfo {
  id: number
  mystery_box_id: number
  name: string
  image: string
  banner: string
  symbol: string
  description: string
  picture_description: string
  license_url: string
  sell_status: number
  sell_price: string
  system_time: number
  sell_start_time: number
  reveals_time: number
  buy_quantity_limit: number
  box_total: number
  sold_quantity: number
  is_bought: number
  specifications: Specifications
  issue_type: number
  issue_number: number
  have_white_list: number
  current_user_in_white_list: number
  current_user_preemption_buy_number: number
  total_preemption_buy_number: number
  white_list_settings: WhiteListSettings
}

export interface Specifications {
  chain_id: number
  contract_address: string
  token_standard: string
  block_chain: string
  creator_earnings: string
}

export interface WhiteListSettings {
  preemption_start_at: number
  preemption_end_at: number
  preemption_total_limit: number
  preemption_buy_limit: number
  preemption_buy_limit_one_time: number
  whitelist_url: string
  preemption_sell_price: string
}

export enum IssueType {
  LIMIT_ISSUE = 1,
  MULTI_ISSUE = 0,
}

export enum IsWhiteList {
  YES = 1,
  NO = 0,
}

export enum UserInWhiteList {
  YES = 1,
  NO = 0,
}

export enum SellStatus {
  NOT_START = 0,
  SELLING = 1,
  SOLD_OUT = 2,
}

export enum WhiteListSellStatus {
  NOT_START_OUT_24H = 0,
  NOT_START_IN_24H = 1,
  TIME_SELLING = 2,
  TIME_END = 3,
}
