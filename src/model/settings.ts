/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 20:54:51
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-18 13:31:35
 * @FilePath: /wave-app-website/src/model/settings.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
