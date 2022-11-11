import DialogComponent from 'components/common/DialogComponent'
import { UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import { useAppSelector } from 'store/store'

export default function NameModal(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function dialogContent() {
    return (
      <div className="dialog-settings-name">
        <h2>Modify Nickname</h2>
        <div className="nick-name">
          <input className="name" placeholder="Nickname" />
          <img src="assets/image/icon_username.png" alt="username" />
        </div>
        <div className="confirm">Confirm</div>
      </div>
    )
  }
  return (
    <li>
      <p>Nickname</p>
      <div>
        <span className="left">{currentUser?.name}</span>
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
