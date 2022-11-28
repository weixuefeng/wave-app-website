/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 17:12:48
 * @FilePath: /wave-app-webiste/src/components/settings/verfiyEmail.tsx
 */

import SendVerifyCodeButton from 'components/common/SendVerifyCodeButton'
import { EmailAction, UserInfo } from 'model/user'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function VerfiyEmail(props) {
  const { t } = useTranslation()
  const { setEmailSettingPage, setTicket } = props
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [verfiyEmailCode, setVerfiyEmailCode] = useState<string>()
  const [isVerfiyEmailCode, setIsVerfiyEmailCode] = useState(false)
  const [nextLoading, setNextLoading] = useState(false)

  function oldRequestEmail() {
    if (verfiyEmailCode == undefined || '') {
      setIsVerfiyEmailCode(true)
      return
    }
    setNextLoading(true)
    setIsVerfiyEmailCode(false)
    Http.getInstance()
      .requestEmailprecheck(verfiyEmailCode)
      .then(response => {
        setTicket(response.email_ticket)
        setEmailSettingPage(1)
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setNextLoading(false)
      })
  }

  return (
    <div className="dialog-settings-email">
      <h2>{t('EMAIL_ADDRESS')}</h2>
      <div className={'password-box'}>
        <div className="email">
          <label htmlFor="email" className="label">
            {t('ORIGINAL_EMAIL_ADDRESS')}
          </label>
          <p>{currentUser?.email}</p>
        </div>
        <div className="code-box">
          <label htmlFor="text" className="label">
            {t('EMAIL_VERIFY_CODE')}
          </label>
          <input placeholder={t('VERIFICATION_CODE')} onChange={e => setVerfiyEmailCode(e.target.value)} />
          <SendVerifyCodeButton email={currentUser?.email} action={EmailAction.CHECK_EMAIL} />
          {isVerfiyEmailCode == true ? <p className="tit">请输入验证码</p> : null}
        </div>
        <button className="primary black" disabled={nextLoading} onClick={() => oldRequestEmail()}>
          <span>
            {t('NEXT')} {nextLoading && '...'}
          </span>
        </button>
      </div>
    </div>
  )
}
