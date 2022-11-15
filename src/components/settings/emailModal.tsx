/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-14 22:44:06
 * @FilePath: /wave-app-webiste/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import { LocalKey } from 'constants/key'
import { putLocalData } from 'localstorage/localstorage'
import { EmailAction, UserInfo } from 'model/user'
import { resolve } from 'path'
import React, { useEffect, useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'

export enum EmailSettingPage {
  VERFIY_EMAIL_PAGE = 0,
  UPDATE_EMAIL_PAGE = 1,
}

export default function EmailModal(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [email, setEmail] = useState<string>()
  const [oldVerifyCode, setOldVerifyCode] = useState<string>()
  const [newVerifyCode, setNewVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  let [isOpen, setIsOpen] = useState(false)

  const [emailSettingPage, setEmailSettingPage] = useState(0)

  const [ticket, setTicket] = useState('')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser])

  function ModifyEmailStep1() {
    function oldGetVerifyCode() {
      Http.getInstance()
        .requestVerifyCode(currentUser.email, EmailAction.CHECK_EMAIL)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

    function oldRequestEmail() {
      Http.getInstance()
        .requestEmailprecheck(oldVerifyCode)
        .then(response => {
          console.log('requestEmailprecheck', response)
          setTicket(response.email_ticket)
          setEmailSettingPage(1)
          setOldVerifyCode('')
        })
        .catch(error => {
          console.log('pre check error')
          console.log(error)
        })
    }

    return (
      <div className="dialog-settings-email">
        <h2>Modify Email</h2>
        <div className={'password-box'}>
          <div className="email">
            <label htmlFor="email" className="label">
              Original Email Address
            </label>
            <p>{currentUser?.email}</p>
          </div>
          <div className="code-box">
            <label htmlFor="text" className="label">
              Email Verification Code
            </label>
            <input placeholder="Verification Code" onChange={e => setOldVerifyCode(e.target.value)} />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code" onClick={() => oldGetVerifyCode()}>
              <span>Send code</span>
            </button>
          </div>
          <button className="next" onClick={() => oldRequestEmail()}>
            <span>Next</span>
          </button>
        </div>
      </div>
    )
  }

  function ModifyEmailStep2() {
    console.log('old', oldVerifyCode, 'new', newVerifyCode)
    function requestEmail() {
      Http.getInstance()
        .requestUpdateEmail(ticket, email, newVerifyCode, null)
        .then(response => {
          let info = {
            ...currentUser,
            email: email,
          }
          dispatch(updateUserInfo(info))
          setIsOpen(false)
          setEmailSettingPage(0)
        })
        .catch(error => {
          console.log(error)
        })
    }

    function requestVerifyCode() {
      Http.getInstance()
        .requestVerifyCode(email, EmailAction.RESET_EMAIL)
        .then(response => {
          console.log('response:::', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
    return (
      <div className="dialog-settings-email">
        <h2>Modify Email</h2>
        <div className={'password-box'}>
          <div className="email">
            <label htmlFor="email" className="label">
              New Email Address
            </label>
            <input placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
            <img src="assets/image/icon_email.png" alt="email" />
          </div>
          <div className="code-box">
            <label htmlFor="text" className="label">
              Email Verification Code
            </label>
            <input placeholder="Verification Code" onChange={e => setNewVerifyCode(e.target.value)} />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code" onClick={() => requestVerifyCode()}>
              <span>Send code</span>
            </button>
          </div>
          <button className="next" onClick={() => requestEmail()}>
            <span>Next</span>
          </button>
        </div>
      </div>
    )
  }

  function dialogContent() {
    switch (emailSettingPage) {
      case EmailSettingPage.VERFIY_EMAIL_PAGE:
        return ModifyEmailStep1()
      case EmailSettingPage.UPDATE_EMAIL_PAGE:
        return ModifyEmailStep2()
    }
  }

  return (
    <li>
      <p>Email</p>
      <div>
        <span className="left">{currentUser?.email}</span>
        <span className="edit" onClick={openModal}>
          Edit
        </span>
      </div>
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        {dialogContent()}
      </DialogComponent>
    </li>
  )
}
