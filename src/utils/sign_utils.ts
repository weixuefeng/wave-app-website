import { LocalKey } from 'constants/key'
import { APP_KEY, APP_SECRET, APP_VERSION } from 'constants/setting'
import { getLocalData } from 'localstorage/localstorage'
import { getI18n } from 'react-i18next'
import { createHash } from 'crypto'
import { UserInfo } from 'model/user'

function fetchCommonPrams() {
  const time = Date.now()
  const param = {
    os: 'web',
    version: APP_VERSION,
    device_id: navigator.platform,
    device_info: navigator.userAgent,
    app_key: APP_KEY,
    language: getI18n().language,
    channel: 'web',
    timestamp: time,
    nonce: time,
  }
  return param
}

export function md5(signContent: string) {
  return createHash('md5').update(signContent, 'utf8').digest('hex')
}

export function sign(data) {
  const params = fetchCommonPrams()
  const content = {
    ...data,
    ...params,
  }
  const user = getLocalData(LocalKey.USER, null)
  if (user) {
    content['access_token'] = (JSON.parse(user) as UserInfo).access_token
  }
  let signContent = ''
  Object.keys(content)
    .sort()
    .forEach(key => {
      if(!content[key]) {
        content[key] = ''
      }
      signContent += key + '=' + content[key] + '&'
    })
  signContent = signContent.substring(0, signContent.length - 1) + APP_SECRET

  const md5Res = md5(signContent)
  content['sign'] = md5Res
  return content
}
