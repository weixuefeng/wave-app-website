/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-11 16:16:09
 * @FilePath: /wave-app-webiste/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import { LocalKey } from 'constants/key'
import { putLocalData } from 'localstorage/localstorage'
import { UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'

export default function EmailModal(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [email, setEmail] = useState<string>()
  const [verifyCode, setVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  let [isOpen, setIsOpen] = useState(false)

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

  console.log('email:', email, 'verifyCode:', verifyCode)

  function requestEmail() {
    Http.getInstance()
      .requestUpdateEmail(null, email, verifyCode, null)
      .then(response => {
        console.log('response', response)
        // putLocalData(LocalKey.USER, JSON.stringify(response))
        // dispatch(updateUserInfo(response))
        closeModal()
      })
      .catch(error => {
        console.log(error)
      })
  }

  function requestVerifyCode() {
    Http.getInstance()
      .requestVerifyCode(email)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function dialogContent() {
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
            <input placeholder="Verification Code" onChange={e => setVerifyCode(e.target.value)} />
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
