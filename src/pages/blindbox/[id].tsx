/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-09-21 10:43:33
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 16:17:43
 * @FilePath: /wave-app-webiste/src/pages/blindbox/[id].tsx
 */

import { PageModel } from 'model/navModel'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { Skeleton } from 'antd'
import { CollectionInfo, UserInWhiteList } from 'model/collection_model'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'
import BlindboxComponent from 'components/blindbox/BlindboxComponent'
import DialogComponent from 'components/common/DialogComponent'
import BuyBlindBoxDialog from 'components/dialog/BuyBlindBoxDialog'
import PasswordDialog from 'components/dialog/PasswordDialog'
import BuySuccessfulDialog from 'components/dialog/BuySuccessfulDialog'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'

export default Home

function Home() {
  const [title, setTitle] = useState('WAVE')
  const [desc, setDesc] = useState('THE WEB3 PLATFORM OF GLOBAL DIGITAL ENTERTAINMENT')
  const [image, setImage] = useState('https://ipfs.wavemall.io/ipfs/QmVtA3LpMUKMoJzt8t28k2eLszomqWkZmBzc8ZQGLpDRg9')
  let pageModel = new PageModel(title, desc, '')
  return <>{NormalLayoutComponent(<Main setTitle={setTitle} setDesc={setDesc} setImage={setImage} />, pageModel)}</>
}

function Main(props) {
  const { setTitle, setDesc, setImage } = props
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [isLogin, setIsLogin] = useState(false)
  const [isInApp, setIsInApp] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>()
  const [calendarInfo, setCalendarInfo] = useState({})
  const [hasAddCalendar, setHasAddCalendar] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(Date.now())

  const [blindBoxProps, setBlindBoxProps] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isBuySucceeded, setBuySucceeded] = useState(false)

  useEffect(() => {
    fetchCollectionInfo()
  }, [id])

  const [isBuyOpen, setIsBuyOpen] = useState(false)

  function closeBuyModal() {
    setIsBuyOpen(false)
  }

  function closePasswordModal() {
    setIsPasswordOpen(false)
  }

  function closeBuySucceededModal() {
    setBuySucceeded(false)
  }

  function onConfirmPassword(password: string) {
    closePasswordModal()
    Http.getInstance()
      .requestBuyBlindBox(id.toString(), password, 1)
      .then(response => {
        setBuySucceeded(true)
        Log.d(response)
        fetchCollectionInfo()
      })
      .catch(err => {
        Log.e(err)
      })
  }

  function fetchCollectionInfo() {
    if (id) {
      Http.getInstance()
        .getMysteryBoxDetail(id.toString())
        .then(response => {
          setCollectionInfo(response)
          initCalendarInfo(response)
        })
    }
  }

  function requestUserInfo() {
    let params = {
      name: 'requestUserInfo',
      data: {},
    }
    postMessage(params, function (data) {
      Log.d('\r\n request user: ' + JSON.stringify(data))
      if (data != null) {
        var info = data
        if (info.error_code == 1) {
          setIsLogin(true)
        } else if (info.error_code == 2) {
          setIsLogin(false)
        } else {
          // show error message
        }
      }
    })
  }

  function requestAddCalendar() {
    let params = {
      name: 'requestCalendar',
      data: calendarInfo,
    }
    postMessage(params, function (data) {
      Log.d('\r\n requestCalendar: ' + JSON.stringify(data))
      if (data != null && data.error_code == 1) {
        setHasAddCalendar(true)
      } else {
        setHasAddCalendar(false)
      }
    })
  }

  function checkCalendar(info) {
    let params = {
      name: 'checkCalendar',
      data: info,
    }
    postMessage(params, function (data) {
      Log.d('\r\n checkCalendar: ' + JSON.stringify(data))

      if (data != null && data.error_code == 1) {
        if (JSON.parse(data.result)['has_add_calendar'] == 1) {
          setHasAddCalendar(true)
        } else {
          setHasAddCalendar(false)
        }
      }
    })
  }

  function requestLanguage() {
    let params = {
      name: 'requestLanguage',
      data: {},
    }
    postMessage(params, function (data) {
      Log.d('\r\n requestLanguage: ' + JSON.stringify(data))
      if (data != null && data.error_code == 1) {
        i18n.changeLanguage(JSON.parse(data.result)['language'])
      }
    })
  }

  function requestPayOrder() {
    let to = ''
    if (collectionInfo.specifications && collectionInfo.specifications.contract_address) {
      to = collectionInfo.specifications && collectionInfo.specifications.contract_address
    }
    let is_whitelist_order = false
    let sellPrice = collectionInfo.sell_price

    const now = Date.now()
    let preemptionBuyLimit = 0
    let preemptionBuyLimitOneTime = 0
    let preemptionTotalLimit = 0
    if (
      collectionInfo.white_list_settings &&
      collectionInfo.white_list_settings.preemption_end_at * 1000 > now &&
      collectionInfo.current_user_in_white_list == UserInWhiteList.YES
    ) {
      is_whitelist_order = true
      sellPrice = collectionInfo.white_list_settings.preemption_sell_price
    } else {
      sellPrice = collectionInfo.sell_price
    }
    if (collectionInfo.white_list_settings) {
      preemptionBuyLimit = collectionInfo.white_list_settings.preemption_buy_limit
      preemptionBuyLimitOneTime = collectionInfo.white_list_settings.preemption_buy_limit_one_time
      preemptionTotalLimit = collectionInfo.white_list_settings.preemption_total_limit
    }
    let params = {
      collection_id: collectionInfo.id.toString(),
      mystery_box_id: collectionInfo.mystery_box_id ? collectionInfo.mystery_box_id.toString() : '',
      price: sellPrice,
      to_address: to,
      is_whitelist_order: is_whitelist_order,
      have_white_list: collectionInfo.have_white_list,
      preemption_buy_limit: preemptionBuyLimit,
      preemption_buy_limit_one_time: preemptionBuyLimitOneTime,
      preemption_total_limit: preemptionTotalLimit,
      current_user_in_white_list: collectionInfo.current_user_in_white_list,
      buy_quantity_limit: collectionInfo.buy_quantity_limit,
      closeBuyModal: closeBuyModal,
      setIsPasswordOpen: setIsPasswordOpen,
    }
    setBlindBoxProps(params)
    setIsBuyOpen(true)
  }

  function gotoTrade() {
    let params = {
      name: 'requestRoute',
      data: {
        path: '/trade/',
        params: {},
      },
    }
    postMessage(params, function (data) {
      if (data != null) {
        Log.d(JSON.stringify(data))
      }
    })
  }

  function gotoAssets() {
    let params = {
      name: 'requestRoute',
      data: {
        path: '/assets/',
        params: {},
      },
    }
    postMessage(params, function (data) {
      if (data != null) {
        Log.d(JSON.stringify(data))
      }
    })
  }

  function requestCollectionInfo(id) {
    let params = {
      name: 'requestCollection',
      data: {
        collection_id: id.toString(), // legacy for v1.2.3 before.
        mystery_box_id: id.toString(),
      },
    }
    postMessage(params, function (data) {
      if (data != null) {
        const info = JSON.parse(data.result)
        setCollectionInfo(info)
        initCalendarInfo(info)
      }
    })
  }

  function initCalendarInfo(collectionInfo: CollectionInfo) {
    setTitle(collectionInfo.name)
    setDesc(collectionInfo.description)
    setImage(collectionInfo.image)
    let startTime = collectionInfo.sell_start_time
    if (collectionInfo.current_user_in_white_list == UserInWhiteList.YES) {
      startTime = collectionInfo.white_list_settings.preemption_start_at
    }
    const info = {
      title: t('WAVE_PLATFORM_EVT') + ` [${collectionInfo.name}] ` + t('COMMINIG_SOON'),
      description: collectionInfo.description,
      eventLocation: 'Wave',
      start_time: startTime,
      end_time: collectionInfo.sell_start_time + 86400,
      advanceTime: 10,
      rule: 'null',
      collection_id: collectionInfo.id,
      mystery_box_id: collectionInfo.mystery_box_id,
    }
    setCalendarInfo(info)
    checkCalendar(info)
  }

  function checkIsInApp() {
    var u = navigator.userAgent.toLocaleLowerCase()
    var flag = u.indexOf('wave') > -1
    setIsInApp(true)

    if (flag) {
      setIsAndroid(u.indexOf('android') > -1)
      setIsIOS(u.indexOf('ios') > -1)
    }
    // @ts-ignore
    if (window && window.webkit && typeof handler !== 'undefined') {
      setIsIOS(true)
    }
    // todo: all is in app
    return true
  }

  function postMessage(params, callback) {
    // @ts-ignore
    if (window && window.flutter_inappwebview) {
      Log.d('send info android')
      // @ts-ignore
      window.flutter_inappwebview.callHandler(JSON.stringify(params), callback)
      // @ts-ignore
    } else if (window && window.webkit && typeof handler !== 'undefined' && isIOS) {
      Log.d('send info ios')
      // @ts-ignore, add ios callback
      window.webkit.messageHandlers[handler].postMessage(params)
    } else {
      Log.d(JSON.stringify(params))
    }
  }

  if (collectionInfo == null) {
    return (
      <div className="skeleton-wap">
        <Skeleton.Image active />
        <Skeleton active paragraph={{ rows: 20 }} />
      </div>
    )
  } else {
    return (
      <>
        <BlindboxComponent
          hasAddCalendar={hasAddCalendar}
          collectionInfo={collectionInfo}
          addToCalendar={() => requestAddCalendar()}
          payOrder={() => requestPayOrder()}
          gotoTrade={() => gotoTrade()}
          gotoAssets={() => gotoAssets()}
        />
        <DialogComponent isOpen={isBuyOpen} closeModal={closeBuyModal}>
          <BuyBlindBoxDialog {...blindBoxProps} />
        </DialogComponent>

        {/** password dialog */}
        <DialogComponent isOpen={isPasswordOpen} closeModal={closePasswordModal}>
          <PasswordDialog onCancel={() => closePasswordModal()} onConfirm={onConfirmPassword} />
        </DialogComponent>

        {/* buy Succeeded Dialog */}
        <DialogComponent isOpen={isBuySucceeded} closeModal={closeBuySucceededModal}>
          <BuySuccessfulDialog onCancel={() => closeBuySucceededModal()} />
        </DialogComponent>
      </>
    )
  }
}
