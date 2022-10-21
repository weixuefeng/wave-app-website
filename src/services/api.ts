/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 16:06:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 16:06:48
 * @FilePath: /nextjs-starter-boilerplate/src/services/http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { WAVE_BASE_URL } from '../constants/setting'

let VERSIONS = 4

export const Api = {
  baseUrl: WAVE_BASE_URL,
  login: `/api/v${VERSIONS}/user/manager-login`,
  emailCode: `/api/v${VERSIONS}/user/manager-login-send-mail-code`,
  account: `/api/v${VERSIONS}/finance/overview`,
  pools: `/api/v${VERSIONS}/finance/pools`,
  bills: `/api/v${VERSIONS}/finance/bills`,
  options: `/api/v${VERSIONS}/finance/options`,
  export: `/api/v${VERSIONS}/finance/export`,
}
