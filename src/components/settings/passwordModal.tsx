/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 17:18:06
 * @FilePath: /wave-app-webiste/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import React, { useState } from 'react'

export default function PasswordModal(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function dialogContent() {
    return (
      <div className="dialog-settings-password">
        <h2>Modify Payment Password</h2>
        <div className={'password-box'}>
          <div className="email">
            <label htmlFor="email" className="label">
              New Email Address
            </label>
            <p className="emailed">ni****er@gmail.com</p>
          </div>

          <div className="code-box">
            <label htmlFor="text" className="label">
              Email Verification Code
            </label>
            <input placeholder="Verification Code" />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code">
              <span>Send code</span>
            </button>
          </div>

          <div className="password">
            <label htmlFor="password" className="label">
              Please Enter the Six-digit Password
            </label>
            <input placeholder="Please Enter the Six-digit Password" />
            <img src="assets/image/icon_password.png" alt="password icon" />
          </div>

          <div className="password">
            <label htmlFor="password" className="label">
              Enter The Transaction Password Again
            </label>
            <input placeholder="Enter The Transaction Password Again" />
            <img src="assets/image/icon_passworded.png" alt="passworded icon" />
          </div>

          <button
            // onClick={() => requestLogin()}
            className="next"
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    )
  }
  return (
    <li>
      <p>Modify Payment Password</p>
      <div>
        <span className="left">******</span>
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
