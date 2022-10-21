import axios, { Axios } from 'axios'
import { Api } from './api'
import { getToken } from '../utils/token'
import { encode } from 'js-base64'
import { sign } from 'utils/sign_utils'
import { BaseResponse } from 'model/base'
import { UserInfo } from 'model/user'

let hasToken = false
let client = refreshClient()

function refreshClient(): Axios {
  return axios.create({
    url: Api.baseUrl,
    timeout: 15000,
    headers: {
      AccessToken: getToken('access_token'),
      AcceptLanguage: 'zh',
    },
  })
}

// check token
function checkToken() {
  let token = getToken('access_token')
  if (token) {
    client = refreshClient()
    hasToken = true
  }
}

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
  if (!hasToken) {
    checkToken()
  }
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
}

export default Http
