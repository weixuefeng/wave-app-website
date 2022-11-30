/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 12:32:36
 * @FilePath: /wave-app-webiste/src/pages/settings.tsx
 */
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import AvataUpload from 'components/settings/avataUpload'
import EmailModal from 'components/settings/emailModal'
import NameModal from 'components/settings/nameModal'
import PasswordModal from 'components/settings/passwordModal'
import { PageModel } from 'model/navModel'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { t } = useTranslation()
  let pageModel = new PageModel('Settings', 'WAVE', '')

  function content() {
    return (
      <div className="settings-page">
        <div className="container mx-auto">
          <div className="setting-list">
            <h2>{t('SETTINGS')}</h2>
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

  return NormalLayoutComponent(content(), pageModel)
}
