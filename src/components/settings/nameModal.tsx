/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 13:48:50
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 15:10:12
 * @FilePath: /wave-app-webiste/src/components/settings/nameModal.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import { UserInfo } from 'model/user'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function NameModal(props) {
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [isOpen, setIsOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [name, setName] = useState(currentUser?.name)
  const dispatch = useAppDispatch()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function updateName() {
    setConfirmLoading(true)
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
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  function onNameChange(e) {
    setName(e.target.value)
  }

  function dialogContent() {
    return (
      <div className="dialog-settings-name">
        <h2>{t('EDIT_NICKNAME')}</h2>
        <div className="nick-name">
          <input className="name" placeholder={t('NICKNAME')} onChange={onNameChange} />
          <img src="/assets/image/icon_username.png" alt="username" />
        </div>
        <button className="primary black confirm" disabled={confirmLoading} onClick={() => updateName()}>
          {t('CONFIRM')} {confirmLoading && '...'}
        </button>
      </div>
    )
  }
  return (
    <li>
      <p>
        <>{t('NICKNAME')}</>
      </p>
      <div>
        <span className="left">{currentUser?.name}</span>
        <span className="edit" onClick={openModal}>
          {t('EDIT')}
        </span>
      </div>
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        {dialogContent()}
      </DialogComponent>
    </li>
  )
}
