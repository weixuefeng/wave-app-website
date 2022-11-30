/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 20:54:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 12:31:00
 * @FilePath: /wave-app-webiste/src/model/settings.ts
 */
export interface PreCheckEmail {
  email_ticket: string
}

export interface SettingConfig {
  mint_collection_gas: string
  mint_nft_gas: string
  withdraw_fee: string
  withdraw_min_amount: string
  withdraw_max_amount: string
  nft_trade_fee: string
  nft_transfer_gas: string
  app_secret_key: string
}
