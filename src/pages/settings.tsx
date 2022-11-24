/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 12:25:14
 * @FilePath: /wave-app-webiste/src/pages/settings.tsx
 */
import NormalLayout from 'components/layout/NormalLayout'
import AvataUpload from 'components/settings/avataUpload'
import EmailModal from 'components/settings/emailModal'
import NameModal from 'components/settings/nameModal'
import PasswordModal from 'components/settings/passwordModal'
import { PageModel } from 'model/navModel'
import React from 'react'

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
