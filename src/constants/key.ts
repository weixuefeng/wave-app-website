/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-08 11:08:04
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-22 15:42:47
 * @FilePath: /wave-app-webiste/src/constants/key.ts
 */
interface LocalKeyInterface {
  readonly LANGUAGE: string
  readonly TOKEN: string
  readonly USER: string
  readonly WALLET: string
}

export const LocalKey: LocalKeyInterface = {
  LANGUAGE: 'language',
  TOKEN: 'token',
  USER: 'user',
  WALLET: 'wallet',
}

export const languageTitle = [
  {
    language: 'en',
    title: 'English',
  },
  {
    language: 'zh',
    title: '中文',
  },
]
