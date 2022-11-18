import DialogComponent from 'components/common/DialogComponent'
import { UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function NameModal(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(currentUser?.name)
  const dispatch = useAppDispatch()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function updateName() {
    Http.getInstance()
      .requestUpdateUserInfo(name, null)
      .then(response => {
        const info = {
          ...currentUser,
          name: response.name,
        }
        dispatch(updateUserInfo(info))
        closeModal()
      })
      .catch(err => {
        Log.e(err)
      })
  }

  function onNameChange(e) {
    setName(e.target.value)
  }

  function dialogContent() {
    return (
      <div className="dialog-settings-name">
        <h2>Modify Nickname</h2>
        <div className="nick-name">
          <input className="name" placeholder="Nickname" onChange={onNameChange} />
          <img src="assets/image/icon_username.png" alt="username" />
        </div>
        <button className="primary black confirm" onClick={() => updateName()}>
          Confirm
        </button>
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
