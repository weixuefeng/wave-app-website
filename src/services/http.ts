import axios, { Axios } from 'axios'
import { Api } from './api'
import { encode } from 'js-base64'
import { sign } from 'utils/sign_utils'
import { BaseResponse, Pagination } from 'model/base'
import { UserInfo } from 'model/user'
import { HomeData } from 'model/asset'
import { Banner } from 'model/banner'
import { NFTDetail } from 'model/nft_asset'
import { EVTDetail } from 'model/evt_asset'
import { TradeItem } from 'model/trade'

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
  login(email: string, code: string): Promise<BaseResponse<UserInfo>> {
    let params = {
      email: email,
      code: code,
    }
    return _post(Api.login, params) as Promise<BaseResponse<UserInfo>>
  }

  // home
  getHomeBanner() {
    let params = {}
    return _post(Api.bannerList, params) as Promise<BaseResponse<Pagination<Banner>>>
  }

  getHomeList() {
    let params = {}
    return _post(Api.nftIndex, params) as Promise<BaseResponse<HomeData>>
  }

  // asset detail
  getNFTInfo(nftId: number): Promise<BaseResponse<NFTDetail>> {
    let params = { nft_id: nftId }
    return _post(Api.nftInfo, params) as Promise<BaseResponse<NFTDetail>>
  }

  getEvtDetail(collectionId: number): Promise<BaseResponse<EVTDetail>> {
    let params = { collection_id: collectionId.toString() }
    return _post(Api.evtDetail, params) as Promise<BaseResponse<EVTDetail>>
  }

  getNFTTradeList(pageId: number = 1, keyword: string | null): Promise<BaseResponse<Pagination<TradeItem>>> {
    let params = {
      keyword: keyword,
      page_id: pageId,
    }
    return _post(Api.nftTradeList, params) as Promise<BaseResponse<Pagination<TradeItem>>>
  }
}

export default Http
