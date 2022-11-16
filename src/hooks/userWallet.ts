import { WalletInfo } from 'model/wallet'
import { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function useWallet() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>()
  const currentUser = useAppSelector(selectUser)

  useEffect(() => {
    Http.getInstance()
      .getWalletInfo()
      .then(res => {
        setWalletInfo(res)
      })
      .catch(error => {
        Log.e(error)
      })
  }, [currentUser])

  return walletInfo
}
