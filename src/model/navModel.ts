/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:35:33
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 11:35:40
 * @FilePath: /nextjs-starter-boilerplate/src/model/navModel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class PageModel {
  title: string
  description: string
  name: string
  constructor(title: string, description: string = '', name: string) {
    this.title = title
    this.description = description
    this.name = name
  }
}
