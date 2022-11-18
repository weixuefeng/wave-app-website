/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-18 15:55:51
 * @FilePath: /wave-app-website/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import { EmailSettingPage } from 'constants/setting'
import { UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import { useAppSelector } from 'store/store'

import UpdateEmail from './updateEmail'
import VerfiyEmail from './verfiyEmail'

export default function EmailModal(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [emailSettingPage, setEmailSettingPage] = useState(0)
  let [isOpen, setIsOpen] = useState(false)
  const [ticket, setTicket] = useState('')
  function closeModal() {
    setIsOpen(false)
    setEmailSettingPage(0)
  }

  function openModal() {
    setIsOpen(true)
  }

  function dialogContent() {
    switch (emailSettingPage) {
      case EmailSettingPage.VERFIY_EMAIL_PAGE:
        return (
          <VerfiyEmail
            emailSettingPage={emailSettingPage}
            setEmailSettingPage={setEmailSettingPage}
            setTicket={setTicket}
          />
        )
      case EmailSettingPage.UPDATE_EMAIL_PAGE:
        return (
          <UpdateEmail
            emailSettingPage={emailSettingPage}
            setEmailSettingPage={setEmailSettingPage}
            setIsOpen={setIsOpen}
            ticket={ticket}
          />
        )
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
