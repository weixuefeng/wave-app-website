/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 20:46:55
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 20:48:55
 * @FilePath: /wave-app-webiste/src/model/message.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface MessageList {
  id: number
  receive_at: number
  sender: Sender
  text: string
  title: string
  type: string
}

export interface Sender {
  avatar: string
  id: number
  name: string
}
