/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-06 13:50:09
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
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import { useAppDispatch, useAppSelector } from 'store/store'

export default function Settings() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const { t } = useTranslation()
  let pageModel = new PageModel('Settings', 'WAVE', '')

  function loginOut() {
    if (currentUser !== null) {
      return (
        <div
          className="login-out block md:hidden"
          onClick={() => {
            dispatch(updateUserInfo(null))
            localStorage.clear()
          }}
        >
          <span>{t('LOGOUT')}</span>
        </div>
      )
    }
  }

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
            {loginOut()}
          </div>
        </div>
      </div>
    )
  }

  return NormalLayoutComponent(content(), pageModel)
}
