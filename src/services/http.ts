import axios, { Axios } from 'axios'
import { Api } from './api'
import { encode } from 'js-base64'
import { sign } from 'utils/sign_utils'
import { BaseResponse, Pagination } from 'model/base'
import { UserInfo } from 'model/user'
import { HomeData, HomeList } from 'model/asset'
import { Banner } from 'model/banner'
import { NFTDetail } from 'model/nft_asset'
import { EVTDetail } from 'model/evt_asset'
import { TradeItem } from 'model/trade'
import { CollectionInfo } from 'model/collection'
import { PAGE_SIZE } from 'constants/constant'
import { LocalKey } from 'constants/key'
import { updateUserInfo } from 'reducer/userReducer'
import { WalletInfo, WalletTransaction } from 'model/wallet'

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
        console.log(error)
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
        console.log(error)
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
  requestVerifyCode(email: string): Promise<any> {
    let params = {
      email: email,
      action: 'login',
      captcha_service_type: 'null',
    }
    return _post(Api.commonEmailCode, params)
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

  getEvtDetail(collectionId: number): Promise<EVTDetail> {
    let params = { collection_id: collectionId.toString() }
    return _post(Api.evtDetail, params) as Promise<EVTDetail>
  }

  getNFTTradeList(pageId: number = 1, keyword: string | null): Promise<Pagination<TradeItem>> {
    let params = {
      keyword: keyword,
      page_id: pageId,
      page_size: 50,
    }
    return _post(Api.nftTradeList, params) as Promise<Pagination<TradeItem>>
  }

  getNFTCollection(collectionId: number): Promise<CollectionInfo> {
    let params = {
      collection_id: collectionId,
    }
    return _post(Api.nftCollection, params) as Promise<CollectionInfo>
  }

  getNFTList(collectionId: number, pageId: number) {
    let params = {
      page_id: pageId,
      page_size: PAGE_SIZE,
      collection_id: collectionId,
    }
    return _post(Api.nftList, params) as Promise<Pagination<any>>
  }

  getNFTActivity(collectionId: number, pageId: number) {
    let params = {
      collection_id: collectionId,
      page_id: pageId,
      page_size: PAGE_SIZE,
    }
    return _post(Api.nftActivity, params) as Promise<Pagination<any>>
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
}

export default Http
