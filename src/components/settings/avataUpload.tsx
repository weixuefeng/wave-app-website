/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 15:00:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 12:51:07
 * @FilePath: /wave-app-webiste/src/components/settings/avataUpload.tsx
 */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { IPFS_UPLOAD } from 'constants/setting'
import { UserInfo } from 'model/user'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const AvataUpload: React.FC = () => {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false)
      const cid = info.file.response?.cid
      const avatar = `ipfs://${cid}`
      Http.getInstance()
        .requestUpdateUserInfo(null, avatar)
        .then(response => {
          setImageUrl(response.avatar)
          const info = {
            ...currentUser,
            avatar: response.avatar,
          }
          dispatch(updateUserInfo(info))
        })
        .catch(error => {
          Log.e(error)
        })
    }
  }

  function imgSrc() {
    return (
      <img
        className="rounded-[50%]"
        src={
          currentUser?.avatar == undefined || currentUser?.avatar == ''
            ? '/assets/image/icon_avata.png'
            : currentUser?.avatar
        }
        alt="avatar"
      />
    )
  }

  const uploadButton = (
    <div className="h-full">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mx-auto h-14 w-14">{imgSrc()}</div>
    </div>
  )

  return (
    <Upload
      name="saveThisFileSafely"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={IPFS_UPLOAD}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
      <div className="avater-text">{t('EDIT')}</div>
    </Upload>
  )
}

export default AvataUpload
