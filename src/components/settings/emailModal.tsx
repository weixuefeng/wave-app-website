/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-15 13:02:52
 * @FilePath: /wave-app-webiste/src/components/settings/emailModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import { EmailAction, UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'

export enum EmailSettingPage {
  VERFIY_EMAIL_PAGE = 0,
  UPDATE_EMAIL_PAGE = 1,
}

let timeChange

export default function EmailModal(props) {

  const currentUser = useAppSelector(selectUser) as UserInfo

  const [email, setEmail] = useState<string>()
  const [verfiyEmailCode, setVerfiyEmailCode] = useState<string>()
  const [updateEmailCode, setUpdateEmailCode] = useState<string>()
  const dispatch = useAppDispatch()

  let [isOpen, setIsOpen] = useState(false)

  const [isVerfiyEmailCode, setIsVerfiyEmailCode] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isUpdateEmailCode, setIsUpdateEmailCode] = useState(false)

  const [emailSettingPage, setEmailSettingPage] = useState(0)
  const [ticket, setTicket] = useState('')


  const [btnContent, setBtnContent] = useState('Send code')
  const [time, setTime] = useState(60)
  const [btnDisabled, setBtnDisabled] = useState(false)

  function closeModal() {
    setEmailSettingPage(0)
    setIsOpen(false)
    setIsVerfiyEmailCode(false)
    setIsEmail(false)
    setIsUpdateEmailCode(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser])

  useEffect(() => {
    clearInterval(timeChange)
    return () => clearInterval(timeChange)
  }, [])

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s后重发`)
    } else {
      console.log('nsdifnisdfnsdi',timeChange)
      clearInterval(timeChange)
      setBtnDisabled(false)
      setTime(60)
      setBtnContent('Send code')
    }
  }, [time])


  function verfiyEmail() {
    function oldGetVerifyCode() {
      timeChange = setInterval(() => setTime(t => --t), 1000)
      console.log('kkkk',timeChange,time)
      setBtnDisabled(true)
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
      console.log('verfiyEmailCode', verfiyEmailCode)
      if (verfiyEmailCode == undefined || '') {
        setIsVerfiyEmailCode(true)
        return
      }
      setIsVerfiyEmailCode(false)
      Http.getInstance()
        .requestEmailprecheck(verfiyEmailCode)
        .then(response => {
          setTicket(response.email_ticket)
          setEmailSettingPage(1)
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
            <input placeholder="Verification Code"
              onChange={e => setVerfiyEmailCode(e.target.value)} />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code" disabled={btnDisabled} onClick={() => oldGetVerifyCode()}>
              <span>{btnContent}</span>
            </button>
            {
              isVerfiyEmailCode == true ? <p className='tit'>请输入验证码</p> : null
            }
          </div>

          <button className="next" onClick={() => oldRequestEmail()}>
            <span>Next</span>
          </button>
        </div>
      </div>
    )
  }


  function updateEmail() {

    function requestEmail() {
      if (updateEmailCode == undefined || '') {
        setIsUpdateEmailCode(true)
        return
      }
      setIsUpdateEmailCode(false)
      Http.getInstance()
        .requestUpdateEmail(ticket, email, updateEmailCode, null)
        .then(response => {
          let info = {
            ...currentUser,
            email: email
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
      if (email == undefined || '') {
        setIsEmail(true)
        return
      }
      setIsEmail(false)
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
            {
              isEmail ?
                <p className='tit-email'>请输入邮箱</p> : null
            }
          </div>
          <div className="code-box">
            <label htmlFor="text" className="label">
              Email Verification Code
            </label>
            <input className=' hidden' placeholder="Verification Code" />
            <input placeholder="Verification Code" onChange={e => setUpdateEmailCode(e.target.value)} />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code" disabled={btnDisabled} onClick={() => requestVerifyCode()}>
              <span>{btnContent}</span>
            </button>
            {
              isUpdateEmailCode ?
                <p className='tit-email'>请输入验证码</p> : null
            }
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
        return verfiyEmail()
      case EmailSettingPage.UPDATE_EMAIL_PAGE:
        return updateEmail()
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
