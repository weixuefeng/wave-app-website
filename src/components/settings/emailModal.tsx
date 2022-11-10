/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 17:10:29
 * @FilePath: /wave-app-webiste/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import React, { useState } from 'react'

export default function EmailModal(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
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
            <input placeholder="Email Address" />
            <img src="assets/image/icon_email.png" alt="email" />
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

          <button className="next">
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
        <span className="left">Henry@gmail.com</span>
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
