import axios, { Axios } from 'axios'
import { Api } from './api'
import { encode } from 'js-base64'
import { md5, sign } from 'utils/sign_utils'
import { BaseResponse, Pagination } from 'model/base'
import { EmailAction, UserInfo } from 'model/user'
import { HomeList, MyAsset } from 'model/asset'
import { Banner } from 'model/banner'
import { NFTDetail } from 'model/nft_asset'
import { EVTCopyDetail } from 'model/evt_asset'
import { TradeItem } from 'model/trade'
import { BaseCollectionInfo, CollectionAllItem } from 'model/collection'
import { PAGE_SIZE } from 'constants/constant'
import { LocalKey } from 'constants/key'
import { updateUserInfo } from 'reducer/userReducer'
import { WalletInfo, WalletTransaction } from 'model/wallet'
import { OfferType } from 'model/offer'
import { CinemaList } from 'model/cinema'
import { CollectionInfo } from 'model/collection_model'
import { PreCheckEmail, SettingConfig } from 'model/settings'
import Log from 'utils/log'
import { MessageList } from 'model/message'
import { TicketsData } from 'model/tickets'

let client = refreshClient()

function refreshClient(): Axios {
  return axios.create({
    url: Api.baseUrl,
    timeout: 15000,
    headers: {
      AcceptLanguage: 'zh',
    },
  })
}

// check token
function checkToken() {}

function _post(url: string, param: any, config: any = null) {
  return new Promise(function (resolve, reject) {
    let data = {
      params: sign(param),
      internal_url: url,
    }
    client
      .post('/api/proxy/', data, config)
      .then(response => {
        if (response.status === 200) {
          const info = response.data as BaseResponse<any>
          if (info.error_code == 1) {
            resolve(info.result)
          } else if (info.error_code == 2) {
            localStorage.removeItem(LocalKey.USER)
            localStorage.removeItem(LocalKey.TOKEN)
            updateUserInfo(null)
            reject(info.error_message)
          } else {
            reject(info.error_message)
          }
        } else {
          reject(response.statusText)
        }
      })
      .catch(error => {
        Log.e(error)
        reject(error)
      })
  })
}

function _get(url) {
  return new Promise(function (resolve, reject) {
    const getUrl = `/api/proxy/?path=${encode(url)}`
    client
      .get(getUrl)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response.statusText)
        }
      })
      .catch(error => {
        Log.e(error)
        reject(error)
      })
  })
}

let httpInstance: Http = null

class Http {
  static getInstance(): Http {
    if (httpInstance === undefined || httpInstance == null) {
      httpInstance = new Http()
    }
    return httpInstance
  }

  // get verify code
  requestVerifyCode(email: string, action: EmailAction): Promise<any> {
    let params = {
      email: email,
      action: action,
      captcha_service_type: 'null',
    }
    return _post(Api.commonEmailCode, params)
  }

  requestUpgrade(): Promise<any> {
    let params = {}
    return _post(Api.commonUpgrade, params) as Promise<any>
  }

  // login
  login(email: string, code: string): Promise<UserInfo> {
    let params = {
      email: email,
      code: code,
    }
    return _post(Api.login, params) as Promise<UserInfo>
  }

  // home
  getHomeBanner() {
    let params = {}
    return _post(Api.bannerList, params) as Promise<Pagination<Banner>>
  }

  getHomeList() {
    let params = {}
    return _post(Api.nftIndex, params) as Promise<HomeList>
  }

  // asset detail
  getNFTInfo(nftId: number): Promise<NFTDetail> {
    let params = { nft_id: nftId }
    return _post(Api.nftInfo, params) as Promise<NFTDetail>
  }

  // getEvtDetail(collectionId: number): Promise<EVTDetail> {
  //   let params = { collection_id: collectionId.toString() }
  //   return _post(Api.evtDetail, params) as Promise<EVTDetail>
  // }

  getEvtCopyDetail(nftId: number): Promise<EVTCopyDetail> {
    let params = { nft_id: nftId.toString() }
    return _post(Api.evtCopyDetail, params) as Promise<EVTCopyDetail>
  }

  getNFTTradeList(pageId: number = 1, keyword: string | null): Promise<Pagination<TradeItem>> {
    let params = {
      keyword: keyword,
      page_id: pageId,
      page_size: 50,
    }
    return _post(Api.nftTradeList, params) as Promise<Pagination<TradeItem>>
  }

  getNFTCollection(collectionId: number): Promise<BaseCollectionInfo> {
    let params = {
      collection_id: collectionId,
    }
    return _post(Api.nftCollection, params) as Promise<BaseCollectionInfo>
  }

  getNFTList(collectionId: number, pageId: number): Promise<Pagination<CollectionAllItem>> {
    let params = {
      page_id: pageId,
      page_size: PAGE_SIZE,
      collection_id: collectionId,
    }
    return _post(Api.nftList, params) as Promise<Pagination<any>>
  }

  getMysteryBoxDetail(mysteryBoxId: string): Promise<CollectionInfo> {
    let params = {
      mystery_box_id: mysteryBoxId,
    }
    return _post(Api.nftMysteryBoxDetail, params) as Promise<CollectionInfo>
  }

  getNFTActivity(collectionId: number, pageId: number) {
    let params = {
      collection_id: collectionId,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.nftActivity, params) as Promise<Pagination<any>>
  }

  getEvtTickets(pageId: number): Promise<Pagination<TicketsData>> {
    let params = {
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.evtTickets, params) as Promise<Pagination<TicketsData>>
  }
  // wallet info
  getWalletInfo(): Promise<WalletInfo> {
    let params = {}
    return _post(Api.walletInfo, params) as Promise<WalletInfo>
  }

  getWalletTransaction(pageId: number, tradeType: number): Promise<Pagination<WalletTransaction>> {
    let params = {
      page_id: pageId,
      page_size: PAGE_SIZE,
      trade_type: tradeType,
    }
    return _post(Api.walletTransaction, params) as Promise<Pagination<WalletTransaction>>
  }

  getWalletWithdraw(amount: string, password: string, address: string): Promise<any> {
    let params = {
      amount: amount,
      password: md5(`wave${password}`),
      address: address,
    }
    return _post(Api.walletWithdraw, params) as Promise<Pagination<any>>
  }

  // order
  getOrderOnSale(userId: number, pageId: number): Promise<Pagination<any>> {
    let params = {
      user_id: userId,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.orderOnSale, params) as Promise<any>
  }

  getOrderOffer(userId: number, pageId: number, offerType: OfferType): Promise<Pagination<any>> {
    let params = {
      user_id: userId,
      page_id: pageId,
      page_size: PAGE_SIZE,
      offer_type: offerType,
    }
    return _post(Api.orderOffers, params) as Promise<any>
  }

  getMyAssetList(userId: number, pageId: number): Promise<Pagination<MyAsset>> {
    let params = {
      user_id: userId,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.nftAssetList, params) as Promise<Pagination<MyAsset>>
  }

  requestOrderBid(nftId: number, price: string, password: string, endTime: number): Promise<any> {
    let params = {
      nft_id: nftId,
      price: price,
      password: md5(`wave${password}`),
      start_time: parseInt((Date.now() / 1000).toString()).toString(),
      end_time: endTime.toString(),
    }
    return _post(Api.orderBid, params) as Promise<Pagination<any>>
  }

  requestOrderBuy(sellId: number, password: string): Promise<any> {
    let params = {
      sell_id: sellId,
      password: md5(`wave${password}`),
    }
    return _post(Api.orderSellDeal, params) as Promise<Pagination<any>>
  }

  requestOrderCancel(sellId: number) {
    let params = {
      sell_id: sellId,
    }
    return _post(Api.orderSellCancel, params) as Promise<Pagination<any>>
  }

  requestOrderSell(nftId: number, price: string, endTime: string, directionAddress: string | null): Promise<any> {
    let params = {
      nft_id: nftId,
      price: price,
      end_time: endTime,
      direction_address: directionAddress,
      start_time: parseInt((Date.now() / 1000).toString()).toString(),
    }
    return _post(Api.orderSell, params) as Promise<Pagination<any>>
  }

  // my cinema request
  getMyCinemaList(pageId: number): Promise<Pagination<CinemaList>> {
    let params = {
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.evtCinemaList, params) as Promise<Pagination<CinemaList>>
  }

  requestUpdateAvatar() {
    let params = {}
    return _post(Api.userAvatarUpdate, params) as Promise<any>
  }

  requestUpdateUserInfo(name: string | null, avatar: string | null) {
    let params = {
      name: name,
      avatar: avatar,
    }
    return _post(Api.userUpdateInfo, params) as Promise<any>
  }

  requestUpdateEmail(emailTicket: string, email: string, emailCode: string, gaCode: string): Promise<any> {
    let params = {
      email_ticket: emailTicket,
      email: email,
      email_code: emailCode,
      ga_code: gaCode,
    }
    return _post(Api.userEmailUpdate, params) as Promise<any>
  }

  // emailTicket
  requestEmailprecheck(emailCode: string): Promise<PreCheckEmail> {
    let params = {
      email_code: emailCode,
    }
    return _post(Api.userPrecheck, params) as Promise<PreCheckEmail>
  }

  requestUpdateName() {
    let params = {}
    return _post(Api.userNameUpdate, params) as Promise<any>
  }

  requestUpdatePassword(emailCode: string, password: string): Promise<any> {
    let params = {
      email_code: emailCode,
      password: md5(`wave${password}`),
    }
    return _post(Api.userPaymentPasswordUpdate, params) as Promise<any>
  }

  // message
  getMessageList(session_id: number, pageId: number): Promise<Pagination<MessageList>> {
    let params = {
      session_id: session_id,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.message, params) as Promise<any>
  }

  // user
  getUserInfo(userId: number): Promise<UserInfo> {
    let params = {
      user_id: userId,
    }
    return _post(Api.userInfo, params) as Promise<UserInfo>
  }

  getOtherAssetList(otherUserId: number, pageId: number): Promise<Pagination<MyAsset>> {
    let params = {
      other_user_id: otherUserId.toString(),
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.nftOtherAssetList, params) as Promise<Pagination<MyAsset>>
  }

  getCommonSettings(): Promise<SettingConfig> {
    let params = {}
    return _post(Api.commonSetting, params) as Promise<SettingConfig>
  }

  requestBuyBlindBox(mysteryBoxId: number | string, password: string, num: number | string): Promise<any> {
    let params = {
      mystery_box_id: mysteryBoxId.toString(),
      number: num.toString(),
      password: md5(`wave${password}`),
    }
    return _post(Api.nftBuyBlindBox, params) as Promise<any>
  }

  requestCancelBid(bidId: number): Promise<any> {
    let params = {
      bid_id: bidId,
    }
    return _post(Api.orderBidCancel, params) as Promise<any>
  }

  requestAcceptBid(bidId: number): Promise<any> {
    let params = {
      bid_id: bidId,
    }
    return _post(Api.orderBidDeal, params) as Promise<any>
  }

  requestNFTOrderOffers(nftId: string, pageId: number): Promise<any> {
    let params = {
      nft_id: nftId,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.nftOrderOffers, params) as Promise<any>
  }
}

export default Http
