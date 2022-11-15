/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:06:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-15 13:08:04
 * @FilePath: /wave-app-webiste/src/constants/setting.ts
 */
export const WAVE_BASE_URL = process.env.NEXT_PUBLIC_WAVE_BASE_URL
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION
export const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY
export const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET
export const IS_DEBUG = process.env.NEXT_PUBLIC_IS_DEBUG == 'true'
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX

export enum EmailSettingPage {
  VERFIY_EMAIL_PAGE = 0,
  UPDATE_EMAIL_PAGE = 1,
}
