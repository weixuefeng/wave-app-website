/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 21:26:04
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import React, { useState, useEffect } from 'react'

export default function Cinema() {
  let pageModel = new PageModel('Cinema', 'WAVE', '')

  function content() {
    return (
      <div className="cinema-page">
        <h2 className="title">My Cinema</h2>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
