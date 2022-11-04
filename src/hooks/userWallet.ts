import { WalletInfo } from 'model/wallet'
import { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'

export default function useWallet() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>()
  const currentUser = useAppSelector(selectUser)

  useEffect(() => {
    Http.getInstance()
      .getWalletInfo()
      .then(res => {
        setWalletInfo(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [currentUser])

  return walletInfo
}
