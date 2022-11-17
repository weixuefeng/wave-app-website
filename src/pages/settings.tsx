/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 16:19:20
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NormalLayout from 'components/layout/NormalLayout'
import AvataUpload from 'components/settings/avataUpload'
import EmailModal from 'components/settings/emailModal'
import NameModal from 'components/settings/nameModal'
import PasswordModal from 'components/settings/passwordModal'
import { PageModel } from 'model/navModel'
import React, { useState, useEffect } from 'react'

export default function Settings() {
  let pageModel = new PageModel('Settings', 'WAVE', '')

  function content() {
    return (
      <div className="settings-page">
        <div className="container mx-auto">
          <div className="setting-list">
            <div className="avata">
              <AvataUpload />
            </div>
            <ul className="itme">
              <NameModal />
              <EmailModal />
              <PasswordModal />
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
