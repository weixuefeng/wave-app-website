/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:06:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 20:54:51
 * @FilePath: /wave-app-webiste/src/services/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { API_VERSION } from 'constants/constant'
import { API_PREFIX, WAVE_BASE_URL } from '../constants/setting'

export const Api = {
  baseUrl: `${WAVE_BASE_URL}/${API_PREFIX}/v${API_VERSION}/`,
  // common
  commonEmailCode: 'common/email/code/',
  commonSetting: 'common/settings/',
  commonUpgrade: 'common/upgrade/',

  // user
  userInfo: 'user/info/',
  login: 'user/login/',
  logout: 'user/logout',
  userUpdateInfo: 'user/info/update/',
  userPaymentPasswordUpdate: 'user/payment-password/update/',
  userAvatarUpdate: 'user/avatar/update/',
  userNameUpdate: 'user/name/update/',
  userEmailUpdate: 'user/email/update/',
  userCollections: 'user/collections/',
  userPrecheck: 'user/email/precheck/',

  // home
  nftIndex: 'nft/index',
  bannerList: 'banner/list/',

  // nft assets
  nftInfo: 'nft/info/',
  evtDetail: 'evt/collection/detail',
  nftTradeList: 'nft/trade/list',
  nftList: 'nft/list/',
  nftOtherAssetList: 'nft/other/assets/list',
  nftActivity: 'nft/activity/',
  nftAssetList: 'nft/assets/list',
  nftMysteryBoxDetail: 'nft/mystery-box/detail',
  nftBuyBlindBox: 'nft/mystery-box/buy',
  nftOrderOffers: 'order/nft/offers/',

  // collections
  nftCollection: 'nft/collection/info/',

  //evt
  evtTickets: 'evt/ticket/folder',
  evtCopyDetail: 'evt/copy/detail',
  evtCinemaList: 'evt/cinema/list',
  evtMyTickets: 'evt/ticket/folder',
  evtBuyTicket: 'evt/buy/ticket',

  // wallet
  walletInfo: 'wallet/info/',
  walletTransaction: 'wallet/transfers/',
  walletWithdraw: 'wallet/withdraw/',
  walletOptions: 'wallet/options',

  // order
  orderOnSale: 'order/onsale/',
  orderOffers: 'order/offers/',
  orderSellDeal: 'order/sell/deal/',
  orderSellCancel: 'order/sell/cancel/',
  orderSell: 'order/sell/',
  orderBid: 'order/bid/',
  orderBidDeal: 'order/bid/deal/',
  orderBidCancel: 'order/bid/cancel/',

  // message
  message: 'message/sessions/detail/',

  // wave app down
  waveVersion: 'common/version/latest',
}
