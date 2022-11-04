/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 19:02:12
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-04 19:02:40
 * @FilePath: /wave-app-webiste/src/model/tickets.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */

export interface TicketsData {
  check_validity_period: number
  collection_id: number
  copyright_expire_time: number
  expire_time: number
  id: number
  image: string
  is_copyright_expire: boolean
  name: string
  price: number
  purchase_time: number
  status: number
  type: number
}
