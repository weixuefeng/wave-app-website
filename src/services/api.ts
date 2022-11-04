/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:06:08
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-04 20:39:45
 * @FilePath: /wave-app-website/src/services/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { API_VERSION } from 'constants/constant'
import { API_PREFIX, WAVE_BASE_URL } from '../constants/setting'

export const Api = {
  baseUrl: `${WAVE_BASE_URL}/${API_PREFIX}/v${API_VERSION}/`,
  // common
  commonEmailCode: 'common/email/code/',

  // user
  userInfo: 'user/info',
  login: 'user/login/',
  logout: 'user/logout',
  paymentPasswordUpdate: 'user/payment-password/update',
  userCollections: 'user/collections/',

  // home
  nftIndex: 'nft/index',
  bannerList: 'banner/list/',

  // assets
  nftInfo: 'nft/info/',
  evtDetail: 'evt/collection/detail',
  nftTradeList: 'nft/trade/list',
  nftList: 'nft/list/',
  nftActivity: 'nft/activity/',
  nftAssetList: 'nft/assets/list',

  // collections
  nftCollection: 'nft/collection/info/',

  //evt
  evtTickets: 'evt/ticket/folder',

  // wallet
  walletInfo: 'wallet/info/',
  walletTransaction: 'wallet/transfers/',

  // order
  orderOnSale: 'order/onsale/',
  orderOffers: 'order/offers/',
}
